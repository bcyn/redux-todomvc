import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TodoHeader extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input className="new-todo"
               ref="addTodoInput"
               autofocus
               autoComplete="off"
               placeholder="What needs to be done?" 
               onKeyPress={ () => this.props.addItem(this.refs.addTodoInput.value) }/>
      </header>
    );
  }
};