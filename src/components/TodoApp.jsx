import React, { Component } from 'react';
import TodoList from './TodoList';

export default class TodoApp extends Component {
  render() {
    return (
      <div>
        <section className="todoapp">
          <TodoList todos={this.props.todos} />
        </section>
      </div>
    );
  }
};