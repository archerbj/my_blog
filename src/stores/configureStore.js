'use strict';

import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import accountReducer from '../reducers/accountReducer';

export default function configureStore(initialState) {

  var middlewareList = [thunkMiddleware];

  middlewareList.push(createLogger());

  const createStoreWithMiddleWare = compose(
    applyMiddleware(...middlewareList)
  )(createStore);

  const reducer = combineReducers({
    account: accountReducer
  });

  const store = createStoreWithMiddleWare(reducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    //module.hot.accept('../reducers/', () => {
    //  store.replaceReducer(accountReducer);
    //})
  }

  return store;
}
