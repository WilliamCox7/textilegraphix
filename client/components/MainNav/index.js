import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { getAsset } from '../../modules';
import './style.scss';

class MainNav extends Component {
  render() {
    return (
      <div id="MainNav" className="flex jc-sb">
        <div id="main-nav-left" className="flex">
          <Link to="/" onClick={() => this.props.updateRoute('/')}>
            <img id="nav-logo" src={getAsset('logo-text-black')} />
          </Link>
          <div id="nav-links" className="flex ai-fe">
            <Link to="/products" className={this.props.route === '/products' ? 'active' : null}
              onClick={() => this.props.updateRoute('/products')}>
              Products
            </Link>
            {/*
            <Link to="/blog className={this.props.route === '/blog' ? 'active' : null}"
              onClick={() => this.props.updateRoute('/blog')}>
              Blog
            </Link>
            */}
            <Link to="/about" className={this.props.route === '/about' ? 'active' : null}
              onClick={() => this.props.updateRoute('/about')}>
              About
            </Link>
            <Link to="/support" className={this.props.route === '/support' ? 'active' : null}
              onClick={() => this.props.updateRoute('/support')}>
              Support
            </Link>
          </div>
        </div>
        <div id="main-nav-right" className="flex ai-fe">
          <div id="nav-cart-wrapper" className="flex ai-c">
            <span id="num-items">{this.props.cart.orders.length} Items</span>
            <span id="cart-divider">|</span>
            <Link to="/cart" onClick={() => this.props.updateRoute('/cart')}>
              <img id="cart-icon" src={getAsset('shopping-cart')} />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(MainNav);
