import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import appReducer  from '../reducers';

// const thunk = (store) => (next) => (action) =>
//   typeof action === 'function' ?
//   action(store.dispatch, store.getState) :
//   next(action);

// middlewares
// Aplicar operações nas actions antes de passar a action para os reducers.
// No final, store.dispatch será composto com os diversos middlewares da chain.
// f(g(h(x))).

// applicando currying para crias aas funções middleware:
// DRY: next é passado pois para obtê-lo é necessário a mesma ação: pegar a função dispatch da store
// logger não tem o mesmo formato que promise pq tem uma verificação a mais
// (console.group) que realizada fora dela criar uma dependência externa desnecessária.
// next é a store.dispatch "atual"

// const logger = (store) => (next) => {
//
//   if (!console.group) {
//     return next;
//   }
//
//   return (action) => {
//     console.group(action.type);
//     console.log('%c prev state', 'color: gray', store.getState());
//     console.log('%c action', 'color: blue', action);
//     const returnValue = next(action); // executa a action para manter o contrato
//     console.log('%c next state', 'color: green', store.getState());
//     console.groupEnd(action.type);
//     return returnValue;
//   };
// };

// const promise = (store) => (next) => (action) => {
//   if (typeof action.then === 'function') { // verifica se é uma promise
//     return action.then(next);
//   }
//   return next(action);
// };

// Applica os middlewares à função dispatch da store.
// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares.slice().reverse().forEach(middleware =>
//     store.dispatch = middleware(store)(store.dispatch)
//   );
// }

// factory function para criar a store a ser utilizada
export const configureStore = () => {
  // const middlewares = [promise];
  const middlewares = [thunk];
  if (!process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }

  return createStore(
    appReducer,
    applyMiddleware(...middlewares), // enhancer
  );
}
