import axiosMiddleware from 'redux-axios-middleware';
import throttle from 'lodash/throttle';
import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';

import { axiosClient, axiosMiddlewareOptions } from 'utils';

import reactBlogApp from './reducers';
import { loadState, saveState } from './localStorage';

/**
 * Configure the main store for the application
 *
 * @method configureStore
 * @return {Function}
 */
const configureStore = () => {
  // Grab the current NODE_ENV from the process
  const NODE_ENV = process && process.env && process.env.NODE_ENV;
  // Set the persisted state by loading the default state
  const persistedState = loadState();
  // Build the middleware by adding additional items to this list
  const middleware = [axiosMiddleware(axiosClient, axiosMiddlewareOptions)];
  // If the current NODE_ENV is 'development', then let's activate the redux-logger.
  if (NODE_ENV === 'development') {
    middleware.unshift(logger);
  }
  // Run the Redux DevTools Extension
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // Create the store by adding in the default reducers, the persisted state, and the middleware
  const store = createStore(
    reactBlogApp,
    persistedState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  // Subscribe to the store, by saving the state each successfull call
  store.subscribe(
    throttle(() => {
      saveState({
        categories: store.getState().categories,
        comments  : store.getState().comments,
        posts     : store.getState().posts
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
