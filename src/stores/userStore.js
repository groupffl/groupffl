import _ from 'lodash';

import Dispatcher from '../dispatcher/appDispatcher';
// import ActionTypes from '../constants/actionTypes';
var EventEmitter = require('events').EventEmitter; // TODO: ES6
var assign = require('object-assign'); // TODO: ES6

const CHANGE_EVENT = 'change';

let _users = [];

// TODO: ES6
var UserStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getAllUsers: function() {
    return _users;
  },
  getUserById: function(id) {
    return _.find(_users, { id: id });
  }
});

Dispatcher.register(function(action) {
  switch (actionType) {
    case actionType.CREATE_USER:
      _users.push(action.user);
      UserStore.emitChange();
  }
});

export default UserStore;
