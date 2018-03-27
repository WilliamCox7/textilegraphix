import { React, thunk, createStore, applyMiddleware, compose } from './packages';
import root from './root';

export const store = createStore(
  root, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
