import { React, Component, BrowserRouter, Route } from './packages';
import { Products, Home, Order, Support, Nav, Footer } from './components';
import './reset.scss';
import './main.scss';
import './headers.scss';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/order" component={Order} />
          <Route path="/support" component={Support} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
