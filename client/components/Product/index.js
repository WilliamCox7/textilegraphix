import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";
import './style.scss';

class Product extends Component {
  render() {

    let thumbnail = this.props.product.images[this.props.product.colors[0].hex][0];

    return (
      <Link to="/builder" className="Product" style={{marginRight: `${this.props.marginRight}px`}} onClick={() => this.props.setProduct(this.props.product)}>
        <img src={thumbnail} />
        <div className="product-info-wrapper flex jc-sb">
          <div className="info">
            <h1>{this.props.product.brand}</h1>
            <h2>{this.props.product.number}</h2>
          </div>
          <h1 className="cost">
            <NumberFormat value={this.props.product.costPerShirt} displayType={'text'}
              thousandSeparator={true} prefix={'$'} decimalScale={2} />
          </h1>
        </div>
      </Link>
    );
  }
}

export default Product;
