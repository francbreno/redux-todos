import { combineReducers } from 'redux';

import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/visibilityFilter';
import byId, * as fromById from './byId';
import createList, * as fromList from './createList';

// normalizing state

/**
 * 
 * todos: {
 *  byId: {
 *    1: {
 *      id: 1,
 *      text: 'Task to do',
 *      completed: false,
 *    },
 *    2: {
 *      id: 2,
 *      text: 'Another task to do',
 *      completed: true,
 *    },
 *    ...
 *  },
 *  listByFilter: {
 *    all: {
 *      ids: [1, 5, 8],
 *      isFetching: false,
 *      errorMessage: null,
 *    },
 *    active: {
 *      ids: [1, 5, 8, 2, 3],
 *      isFetching: false,
 *      errorMessage: null,
 *    },
 *    completed: {
 *      ids: [9, 7, 4, 6],
 *      isFetching: false,
 *      errorMessage: null,
 *    }
 *  }
 * }
 */

// Combina todos os reducers de filtro por id em um único reducer
const listByFilter = combineReducers({
  all: createList(SHOW_ALL),
  active: createList(SHOW_ACTIVE),
  completed: createList(SHOW_COMPLETED),
})

// Combina os reducers no reducer final da aplicação
const todos = combineReducers({
  byId,
  listByFilter
});

export default todos;

// Selectors

// Os todos visíveis dependem do filtro selecionado
export const getVisibleTodos = (state, filter) => {
  // Pega o que já foi carregado para um determinado filtro
  const ids = state.listByFilter[filter].ids;
  // Vai no state onde tem todos os ids carregados e identificador por id e obtém um por um
  return ids.map(id => fromById.getTodo(state.byId, id));
}

export const getIsFetching = (state, filter) => {
  return fromList.getIsFetching(state.listByFilter[filter]);
}

export const getErrorMessage = (state, filter) => 
  fromList.getErrorMessage(state.listByFilter[filter]);
