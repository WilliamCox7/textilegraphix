import { React, Component, BrowserRouter, Route } from './packages';
import { Nav, Footer } from './components';
import { Home, Products, Order, Support } from './pages';
import './reset.scss';
import './main.scss';
import './headers.scss';

class App extends Component {

  componentDidMount() {
    window.Intercom("boot", {
      app_id: "c1wl5hbi"
    });
  }

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
