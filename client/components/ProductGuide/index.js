import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';

class ProductGuide extends Component {

  constructor() {
    super();
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
  }

  back() {
    if (this.props.route === '/checkout') {
      this.props.history.push('/product');
      this.props.updateRoute('/product');
    } else if (this.props.route === '/product') {
      this.props.history.push('/products');
      this.props.updateRoute('/products');
    }
  }

  next() {
    if (this.props.route === '/product') {
      this.props.history.push('/checkout');
      this.props.updateRoute('/checkout');
    } else if (this.props.route === '/products') {
      this.props.history.push('/product');
      this.props.updateRoute('/product');
    } else if (this.props.route === '/checkout') {
      this.props.history.push('/cart');
      this.props.updateRoute('/cart');
    }
  }

  render() {
    return (
      <div id="ProductGuide">
        <div id="guide-wrapper" className="flex ai-c jc-sb">
          {this.props.route !== '/products' ? (
            <button id="back-button" onClick={this.back}>BACK</button>
          ) : null}
          {this.props.route === '/products' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="current flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="next flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="next flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.props.route === '/product' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="previous flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="current flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="next flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.props.route === '/checkout' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="previous flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="previous flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="current flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.props.route !== '/products' ? (
            <button id="next-button" onClick={this.next}>{this.props.route === '/product' ? "ADD TO CART" : "CHECKOUT"}</button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductGuide);
