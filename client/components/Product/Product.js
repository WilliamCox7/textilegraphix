import React, { Component } from 'react';
import './Product.scss';

class Product extends Component {
  render() {
    return (
      <div className="Product">
        <div className="image-container">
          <img src={this.props.product.image} />
          <button>Build Product</button>
        </div>
        <h1>{this.props.product.brand.toUpperCase()}</h1>
        <h1>{this.props.product.number}</h1>
      </div>
    );
  }
}

export default Product;
