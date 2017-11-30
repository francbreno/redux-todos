const byId = (state = {}, action) => {
  // switch (action.type) {
  //   case FETCH_TODOS_SUCCESS:
  //     // faço uma shallow copy do state (um slice dele que contém os todos)
  //     // shallow copy porque não vou modificar o state
  //     const nextState = { ...state };
  //     // Adiciona os todos da response ao nextState, substituindo os que já existirem.
  //     action.response.forEach(todo =>
  //       nextState[todo.id] = todo // seria uma mutação do state, mas nextState é uma shallow copy
  //     );
  //     return nextState;
  //   case ADD_TODO_SUCCESS:
  //     return {
  //       ...state,
  //       [action.response.id]: action.response,
  //     }
  //   default:
  //     return state;
  // }
  if (action.response) {
    return {
      ...state,
      ...action.response.entities.todos,
    }
  }
  return state;
};

export default byId;

export const getTodo = (state, id) => state[id];
