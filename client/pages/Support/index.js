import React, { Component } from 'react';
import Actions from '../../components/Actions';
import './style.scss';

class Support extends Component {
  render() {
    return (
      <div id="Support">
        <h1 id="support-header">Support</h1>
        <Actions />
        <div id="bottom-space"></div>
      </div>
    );
  }
}

export default Support;
