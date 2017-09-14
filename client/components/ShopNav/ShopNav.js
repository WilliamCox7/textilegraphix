import React, { Component } from 'react';
import './ShopNav.scss';

class ShopNav extends Component {

  constructor() {
    super();
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(e) {
    var filter = '';
    if (this.props.filter === e.target.innerText.toLowerCase()) {
      filter = '';
    } else {
      filter = e.target.innerText.toLowerCase();
    }
    this.props.setFilter(filter);
  }

  render() {
    return (
      <div className="ShopNav">
        <div onClick={this.setFilter}>T-Shirts</div>
        <div onClick={this.setFilter}>Long Sleeve Shirt</div>
        <div onClick={this.setFilter}>Collared Shirt</div>
        <div onClick={this.setFilter}>Hoodies</div>
        <div onClick={this.setFilter}>Other</div>
        <div onClick={this.setFilter}>Originals</div>
      </div>
    );
  }
}

export default ShopNav;
