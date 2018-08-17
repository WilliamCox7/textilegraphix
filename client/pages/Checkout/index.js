import React, { Component } from 'react';
import { setFooter } from '../../modules';
import './style.scss';

class Checkout extends Component {

  componentDidMount() {
    setFooter('MainFooter');
  }

  componentDidUpdate() {
    setFooter('MainFooter');
  }

  render() {
    return (
      <div id="Checkout">
        Checkout
      </div>
    );
  }
}

export default Checkout;
