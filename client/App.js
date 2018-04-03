import { React, Component, BrowserRouter, Route, connect } from './packages';
import { Products, Home, Order, Support, Nav, Footer } from './components';
import { set } from './reducers/window';
import './reset.scss';
import './main.scss';

class App extends Component {

  componentDidMount() {
    window.addEventListener("resize", () => {
      this.props.set(window.innerWidth);
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

const mapDispatchToProps = {
  set: set
}

export default connect(null, mapDispatchToProps)(App);
