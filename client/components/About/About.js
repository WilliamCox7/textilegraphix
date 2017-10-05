import React, { Component } from 'react';
import './About.scss';

class About extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth
    }
  }

  render() {
    return (
      <div className="About">
        {this.state.width > 600 ? (
          "Desktop"
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

export default About;
