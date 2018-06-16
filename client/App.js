import { React, Component, BrowserRouter, Route, connect, axios } from './packages';
import { Nav, Footer, ProductBuilder, HandleProducts } from './components';
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
          <HandleProducts />
          <Nav />
          <Route exact path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/order" component={Order} />
          <Route path="/support" component={Support} />
          {this.props.builder.show ? <ProductBuilder /> : <Footer />}
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    builder: state.builder
  }
}

export default connect(mapStateToProps)(App);
