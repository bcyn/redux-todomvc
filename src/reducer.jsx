import {Map, fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
    todos: [],
    filter: 'all'
});

function addItem(state, text) {
  const itemId = state.get('todos').reduce((maxId, item) => Math.max(maxId, item.get('id')), 0) + 1;
  const newItem = fromJS({id: itemId, text: text, status: 'active'});
  return state.update('todos', (todos) => todos.push(newItem));
}

function cancelEditing(state, itemId) {
  const itemIndex = findItemIndex(state, itemId);
  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', false);
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function changeFilter(state, filter) {
  return state.set('filter', filter);
}

function clearCompleted(state) {
  return state.update('todos',
    (todos) => todos.filterNot(
      (item) => item.get('status') === 'completed'
    )
  );
}

function deleteItem(state, itemId) {
  return state.update('todos',
    (todo) => todo.filterNot(
      (item) => item.get('id') === itemId
    )
  );
}

function doneEditing(state, itemId, newText) {
  const itemIndex = findItemIndex(state, itemId);
  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', false)
    .set('text', newText);
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function editItem(state, itemId) {
  const itemIndex = findItemIndex(state, itemId);
  const updatedItem = state.get('todos')
    .get(itemIndex)
    .set('editing', true);
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}

function findItemIndex(state, itemId) {
  return state.get('todos').findIndex(
    (item) => item.get('id') === itemId
  );
}

function setState(state, newState) {
  return state.merge(newState);
}

function toggleComplete(state, itemId) {
  const itemIndex = findItemIndex(state, itemId);
  const updatedItem = state.get('todos')
    .get(itemIndex)
    .update('status', status => status === 'active' ? 'completed' : 'active');
  return state.update('todos', todos => todos.set(itemIndex, updatedItem));
}


export default function(state=INITIAL_STATE, action) {
  switch(action.type) {
    case 'ADD_ITEM':
      return addItem(state, action.text);
    case 'CANCEL_EDITING':
      return cancelEditing(state, action.itemId);
    case 'CHANGE_FILTER': 
      return changeFilter(state, action.filter);
    case 'CLEAR_COMPLETED':
      return clearCompleted(state);
    case 'DELETE_ITEM':
      return deleteItem(state, action.itemId);
    case 'DONE_EDITING':
      return doneEditing(state, action.itemId, action.newText);
    case 'EDIT_ITEM':
      return editItem(state, action.itemId);
    case 'SET_STATE':
      return setState(state, action.state);
    case 'TOGGLE_COMPLETE':
      return toggleComplete(state, action.itemId);
  }
  return state;
}