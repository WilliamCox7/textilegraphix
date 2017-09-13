import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth
    }
  }

  render() {
    return (
      <div className="Home">
        {this.state.width > 600 ? (
          "Desktop"
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

export default Home;
