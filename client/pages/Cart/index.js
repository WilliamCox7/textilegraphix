import React, { Component } from 'react';
import { setFooter } from '../../modules';
import './style.scss';

class Cart extends Component {

  componentDidMount() {
    setFooter('MainFooter');
  }

  componentDidUpdate() {
    setFooter('MainFooter');
  }

  render() {
    return (
      <div id="Cart">
        Cart
      </div>
    );
  }
}

export default Cart;
