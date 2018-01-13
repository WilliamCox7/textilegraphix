import { React, ReactDOM, Router, Route, hashHistory, Provider } from './packages';
import { Home, Shop, Submit, Contact, About } from './components';
import { store } from './store';
import App from './App';

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
