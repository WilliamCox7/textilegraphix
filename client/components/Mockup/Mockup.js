import React, { Component } from 'react';
import PrintArea from '../PrintArea/PrintArea';
import './Mockup.scss';

class Mockup extends Component {
  render() {
    return (
      <div className="Mockup">
        <div className="view">

        </div>
        <PrintArea />
      </div>
    );
  }
}

export default Mockup;