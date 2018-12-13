import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from 'react-redux';
import MainNav from './components/MainNav';
import Home from './pages/Home';
import Products from './pages/Products';
import Builder from './pages/Builder';
import Checkout from './pages/Checkout';
import Support from './pages/Support';
import Cart from './pages/Cart';
import About from './pages/About';
import View from './pages/View';
import './reset.scss';
import './main.scss';

class App extends Component {

  constructor() {
    super();
    this.state = {
      route: window.location.pathname
    }
    this.updateRoute = this.updateRoute.bind(this);
  }

  updateRoute(route) {
    this.setState({route: route});
  }

  componentDidMount() {
    window.Intercom("boot", {
      app_id: "c1wl5hbi"
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <MainNav route={this.state.route} updateRoute={this.updateRoute} />
          <div id="nav-space"></div>
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/builder" component={Builder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/support" component={Support} />
          <Route path="/cart" component={Cart} />
          <Route path="/about" component={About} />
          <Route path="/view" component={View} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
