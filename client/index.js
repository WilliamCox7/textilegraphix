/* PACKAGES */
import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from "react-router";

/* COMPONENTS */
import App from './App';
import Home from './components/Home/Home';

/* ROUTES */
ReactDOM.render (
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Home} />
    </Route>
  </Router>
  , document.getElementById('root')
);
