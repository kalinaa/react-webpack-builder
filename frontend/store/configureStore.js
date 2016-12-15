import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
  const logger = createLogger();
  const middlewares = NODE_ENV == 'development' ? applyMiddleware(thunk, logger) : applyMiddleware(thunk);

  const store = createStore(
    rootReducer,
    initialState,
    middlewares
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}