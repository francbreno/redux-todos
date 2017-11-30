import { combineReducers } from 'redux';

import { FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, FETCH_TODOS_REQUEST, ADD_TODO_SUCCESS, TOGGLE_TODO_SUCCESS } from '../actions/action-types';

// cria o reducer de filtros de 'todos'. Cada filtro terá seu próprio reducer. Como a lógica é a mesma,
// o método createList irá encapsulá-la a partir do filtro fornecido.
const createList = (filter) => {
  // ao realizar toggle, caso esteja na tela de completed ou active, teremos que remover imediatamente o todo
  const handleToggle = (state, action) => {
    const { result: toggleId, entities } = action.response;
    const { completed } = entities.todos[toggleId];

    // Verifica se deve remover o todo da lista
    const shouldRemove = (
      // se está na tela de active e 'toggleou' para completed
      (completed && filter === 'active') ||
      // se está na tela de completed e 'toggleou' par active
      (!completed && filter === 'completed')
    );
    // se deve remover, filtra pelo id 'toggleado'. Caso contrário retorna o state como está
    return shouldRemove ?
      state.filter(id => id !== toggleId) :
      state;
  }

  // Mantém a lista de ids de todos que fazem parte do filtro indicado
  const ids = (state = [], action) => {
    // Como os todos retornados são aqueles do filtro solicitado, pego todos e monto
    // um array com seus ids.
    switch(action.type) {
      case FETCH_TODOS_SUCCESS:
        return filter === action.filter ?
          // action.response.map(todo => todo.id) :
          action.response.result :
          state;
      case ADD_TODO_SUCCESS:
        return filter !== 'completed' ?
          // [ ...state, action.response.id ] :
          [ ...state, action.response.result ] :
          state;
      // quando a ação de toggle é executada, o todo clicado deve sair da lista caso ele não esteja na tela 'all'
      case TOGGLE_TODO_SUCCESS:
        return handleToggle(state, action);
      default:
        return state;
    }
  };

  // indica se existe alguma requisição assíncrona sendo processada para o filtro informado
  const isFetching = (state = false, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case FETCH_TODOS_REQUEST:
        return true;
      // Quando receber a action de retorno, seja com ou sem erros, 'desliga' o indicador de requisição assíncrona
      case FETCH_TODOS_SUCCESS:
      case FETCH_TODOS_FAILURE:
        return false
      default:
        return state;
    }
  }

  // Ao completar a requisição, atualizao conteúdo da mensagem de erro de acordo com a action.
  // Em caso de erro, define a mensagem como sendo a fornecida pela action.
  // Nos casos de requisição realizada com sucesso, o conteúdo da mensagem no state será null
  const errorMessage = (state = null, action) => {
    if (action.filter !== filter) {
      return state;
    }

    switch(action.type) {
      case FETCH_TODOS_FAILURE:
        return action.message;
      // Limpa a mensagem de erro atual caso inicie um novo fetch de todos ou retorne um fetch com sucesso
      case FETCH_TODOS_REQUEST:
      case FETCH_TODOS_SUCCESS:
        return null;
      default:
        return state;
    }
  }

  // Combina os reducers para montar o reducer do filtro indicado
  return combineReducers({
    ids,
    isFetching,
    errorMessage,
  });
}

export default createList;

// Selectors
export const getIds = (state) => state.ids;
export const getIsFetching = (state) => state.isFetching;
export const getErrorMessage = (state) => state.errorMessage;
