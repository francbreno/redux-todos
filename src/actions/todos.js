import { normalize } from 'normalizr';

import { ADD_TODO_SUCCESS, TOGGLE_TODO_SUCCESS, FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE } from './action-types';
import * as api from '../api';
import { getIsFetching } from '../reducers';
import * as schema from './schema';

export const addTodoAction = (text) => (dispatch) => 
  api.addTodo(text).then(response => {
    console.log(
      'normalized response',
      normalize(response, schema.todo)
    );
    dispatch({
      type: ADD_TODO_SUCCESS,
      response: normalize(response, schema.todo),
    });
  });

export const toggleTodo = (id) => (dispatch) => 
  api.toggleTodo(id).then(
    response => {
      dispatch({
        type: TOGGLE_TODO_SUCCESS,
        response: normalize(response, schema.todo)
      });
    }
  );

export const fetchTodos = (filter) => (dispatch, getState) => {
  // Evita race conditions e chamadas desnecessárias à rede
  if (getIsFetching(getState(), filter)) {
    return Promise.resolve();
  }

  // Dispara uma action que altera o indicado de requisição assíncrona em execução
  dispatch({
    type: FETCH_TODOS_REQUEST,
    filter,
  });

  // Efetua a chamada à api e dispara as action correspondentes aos casos de sucesso e falha.
  return api.fetchTodos(filter).then(
    response => {
      console.log(
        'normalized response',
        normalize(response, [schema.todo])
      );
      dispatch({
        type: FETCH_TODOS_SUCCESS,
        filter,
        response: normalize(response, [schema.todo]),
      });
    },
    error => {
      dispatch({
        type: FETCH_TODOS_FAILURE,
        filter,
        message: error.message || 'Something went wrong',
      });
    }
  );
};
