import React, { Component } from 'react';
import QuoteBox from '../QuoteBox/QuoteBox';
import logo from '../../src/logo-gray.svg';
import quote from '../../src/quote-icon.svg';
import search from '../../src/search.svg';
import './Nav.scss';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth,
      showQuoteBox: false
    }
    this.showQuoteBox = this.showQuoteBox.bind(this);
  }

  showQuoteBox() {
    this.setState({showQuoteBox: !this.state.showQuoteBox});
  }

  render() {
    return (
      <div className="Nav">
        {this.state.width > 600 ? (
          <div className="nav-container-desktop">
            <a href="/#/">
              <img className="logo" src={logo} />
            </a>
            <div className="links">
              <a href="/#/contact">CONTACT</a>
              {/* <a href="/#/news">NEWS</a> */}
              <a href="/#/shop">SHOP</a>
              <form>
                <input className="search-bar" type="text" />
              </form>
              <img onClick={this.showQuoteBox} className="quote-icon" src={quote} />
              {this.state.showQuoteBox ? (<QuoteBox />) : null}
            </div>
          </div>
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

export default Nav;
