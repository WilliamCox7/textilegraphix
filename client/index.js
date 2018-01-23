import { React, ReactDOM, Router, Route, hashHistory, thunk, Provider, createStore, applyMiddleware, compose } from './packages';
import { Home, Shop, Submit, Contact, About } from './components/components';
import root from './root';
import App from './App';

let store = createStore(
  root, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)

ReactDOM.render(
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
