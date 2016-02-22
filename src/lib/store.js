import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-router';
import { createHashHistory as createHistory } from 'history';
import createLogger from 'redux-logger';
import routes from '../routes';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from './devTools';

// TODO: rethink about logger
const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory }),
  DevTools.instrument(),
  applyMiddleware(createLogger())
)(createStore);

const store = finalCreateStore(rootReducer);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
