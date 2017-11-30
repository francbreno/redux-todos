import React from 'react';
import { connect } from 'react-redux';
import { addTodoAction } from '../actions/todos';

const AddTodo = ({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => {
        input = node;
      }} />
      <button onClick={() => {
        dispatch(addTodoAction(input.value));
        input.value = null;
      }}>
        Add Todo
      </button>
    </div>
  )
}

export default connect()(AddTodo);
