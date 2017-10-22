import throttle from 'lodash/throttle';
import { applyMiddleware, compose, createStore } from 'redux';
import { logger } from 'redux-logger';

import reactBlogApp from './reducers';
import { loadState, saveState } from './localStorage';

const configureStore = () => {
  const persistedState = loadState();
  const middleware = [logger];

  // Run the Redux DevTools Extension
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    reactBlogApp,
    persistedState,
    composeEnhancers(applyMiddleware(...middleware))
  );

  store.subscribe(
    throttle(() => {
      saveState({
        comments: store.getState().comments,
        posts: store.getState().posts,
      });
    }, 1000)
  );

  return store;
};

export default configureStore;
