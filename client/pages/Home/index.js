import React, { Component } from 'react';
import { setFooter } from '../../modules';
import './style.scss';

class Home extends Component {

  componentDidMount() {
    setFooter('HomeFooter');
  }

  componentDidUpdate() {
    setFooter('HomeFooter');
  }

  render() {
    return (
      <div id="Home">
        Home
      </div>
    );
  }
}

export default Home;
