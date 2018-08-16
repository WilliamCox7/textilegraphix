import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './style.scss';

class ProductGuide extends Component {

  constructor(props) {
    super(props);
    this.state = {
      route: props.route
    }
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidMount() {
    this.props.history.listen((location, action) => {
      this.setState({route: location.pathname});
    });
  }

  back() {
    if (this.state.route === '/checkout') {
      this.props.history.push('/builder');
      this.props.updateRoute('/builder');
    } else if (this.state.route === '/builder') {
      this.props.history.push('/products');
      this.props.updateRoute('/products');
    }
  }

  next() {
    if (this.state.route === '/builder') {
      this.props.history.push('/checkout');
      this.props.updateRoute('/checkout');
    } else if (this.state.route === '/products') {
      this.props.history.push('/builder');
      this.props.updateRoute('/builder');
    } else if (this.state.route === '/checkout') {
      this.props.history.push('/cart');
      this.props.updateRoute('/cart');
    }
  }

  render() {
    return (
      <div id="ProductGuide">
        <div id="guide-wrapper" className="flex ai-c jc-sb">
          {this.state.route !== '/products' ? (
            <button id="back-button" onClick={this.back}>BACK</button>
          ) : null}
          {this.state.route === '/products' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="current flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="next flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="next flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.state.route === '/builder' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="previous flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="current flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="next flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.state.route === '/checkout' ? (
            <div className="circle-wrapper flex jc-sb ai-c">
              <span className="previous flex jc-c"><label>SELECT PRODUCT</label></span>
              <span className="previous flex jc-c"><label>PRODUCT BUILDER</label></span>
              <span className="current flex jc-c"><label>SUBMIT ORDER</label></span>
              <hr />
            </div>
          ) : null}
          {this.state.route !== '/products' ? (
            <button id="next-button" onClick={this.next}>{this.state.route === '/builder' ? "ADD TO CART" : "CHECKOUT"}</button>
          ) : null}
        </div>
      </div>
    );
  }
}

export default withRouter(ProductGuide);
