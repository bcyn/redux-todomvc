import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class TextInput extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }
  
  _handleKeyDown(e) {
    switch (e.key) {
      case 'Enter':
        return this.props.doneEditing(this.props.itemId);
      case 'Escape':
        return this.cancelEditing(this.props.itemId);
    }
  }

  _handleOnBlur(e) {
    return this.cancelEditing(this.props.itemId);
  }

  cancelEditing() {
    return this.props.cancelEditing(this.props.itemId);
  }

  render() {
    return (
      <input className="edit"
             autoFocus={true}
             type="text"
             ref="itemInput"
             onKeyDown={this._handleKeyDown.bind(this)} 
             onBlur={this._handleOnBlur.bind(this)} />
    );
  }
};