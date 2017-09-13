import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import './reset.scss';
import './main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        {this.props.children}
      </div>
    );
  }
}

export default App;
