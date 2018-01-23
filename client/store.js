import { createStore, compose, applyMiddleware, thunk } from './packages';
import root from './root';

export const store = createStore(
  root, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
