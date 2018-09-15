import React, { Component } from 'react';
import { setFooter } from '../../modules';
import Actions from '../../components/Actions';
import './style.scss';

class Support extends Component {

  componentDidMount() {
    setFooter('MainFooter');
  }

  componentDidUpdate() {
    setFooter('MainFooter');
  }

  render() {
    return (
      <div id="Support">
        <div className="blue-banner">
          <h1>WE'RE HERE TO HELP YOU!</h1>
        </div>
        <div id="top-space"></div>
        <Actions />
        <div id="bottom-space"></div>
      </div>
    );
  }
}

export default Support;
