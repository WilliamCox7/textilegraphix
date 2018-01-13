import { React, Component } from './packages';
import { Nav, Footer } from './components';
import './reset.scss';
import './main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
