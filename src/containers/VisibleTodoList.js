import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../actions/todos';
import { getVisibleTodos, getErrorMessage, getIsFetching } from '../reducers';
import TodoList from '../components/TodoList';
import FetchError from '../components/FetchError';

class VisibleTodoList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render () {
    const { toggleTodo, errorMessage, todos, isFetching } = this.props;

    // Se está carregando ee ainda não tem nada local, servidno de cache, exibe o loading
    if (isFetching && !todos.length) {
      return <p>Loading...</p>;
    }
    if (errorMessage && !todos.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()} />
      );
    }

    return (
      <TodoList
        todos={todos}
        onTodoClick={toggleTodo}
      />
    );
  }
}

const mapStateToProps = (state, { match }) => {
  const filter = match.params.filter || 'all';
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter,
  };
};

// const mapDispatchToProps = (dispatch) => ({
//   onTodoClick: (id) => {
//     dispatch(toggleTodo(id))
//   },
// });

export default withRouter(connect(
  mapStateToProps,
  // mapDispatchToProps // abaixo uma simplificação (mais obscura, acho)
  actions
)(VisibleTodoList));
