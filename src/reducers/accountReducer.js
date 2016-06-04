'use strict';

function accountReducer (state = { username: '', isLogin: false, errMsg: '' }, action) {
  switch(action.type) {
    case 'login':
    case 'logout':
    case 'authenticated':
      return Object.assign({}, state, action.account);
    default:
      return state;
  }
}

export default accountReducer;
