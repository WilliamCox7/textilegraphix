/* PACKAGES */
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';

/* COMPONENTS */
import App from './App';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Submit from './components/Submit/Submit';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

/* STORE - REDUX */
let store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

/* ROUTES */
ReactDOM.render (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={App}>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/submit" component={Submit} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
