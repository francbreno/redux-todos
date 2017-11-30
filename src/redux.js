import ReactDOM from 'react-dom';
import React from 'react';
import PropTypes from 'prop-types';

// Root Reducer:
/**
 * {
 *    todos: [{...}, {...}, ..., {...}],
 *    visibilityFilter: ''
 * }
 *
 * todos e visibilityFilter são as keys
 * Vai acumulando em um objeto cada slice do state até obter o state completo, começando de um objeto vazio {}
 *
 * nextState é o acumulado do reduce
 */
// combineReducers = (reducers) => {
//   return (state = [], action) => {
//     // pega cada key que referencia um reducer, executa o reducer
//     // correspondente para acumular o state
//     return Object.keys(reducers).reduce(
//       (nextState, key) => {
//         nextState[key] = reducers[key](
//           state[key],
//           action
//         );
//         return nextState;
//       },
//       {} // valor inicial da função reduce
//     );
//   }
// };

// Components

// Presentation or Container??? maybe both!


// store DI via context: works as Provider from react-redux
// class Provider extends React.Component {
//   getChildContext () {
//     return {
//       store: this.props.store
//     }
//   }
//
//   render () {
//     return this.props.children;
//   }
// }
// Provider.childContextTypes = {
//   store: PropTypes.object
// }
