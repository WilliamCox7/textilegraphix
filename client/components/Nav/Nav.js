import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { setLocation } from '../../reducers/nav';
import QuoteBox from '../QuoteBox/QuoteBox';
import logo from '../../src/logo-gray.svg';
import quoteGray from '../../src/quote-icon-gray.svg';
import quoteBlue from '../../src/quote-icon-blue.svg';
import search from '../../src/search.svg';
import './Nav.scss';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth,
      showQuoteBox: false,
      searchActive: false
    }
    this.showQuoteBox = this.showQuoteBox.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setSearch = this.setSearch.bind(this);
  }

  componentDidMount() {
    var location = hashHistory.getCurrentLocation().pathname;
    location = location.split("/")[1];
    this.props.setLocation(location);
    window.addEventListener("click", (e) => {
      if (e.target.className !== 'search-bar' && e.target.className !== 'search-button') {
        this.setState({searchActive: false});
      }
    });
  }

  showQuoteBox() {
    this.setState({showQuoteBox: !this.state.showQuoteBox});
  }

  setLocation(e) {
    var location = e.target.innerText.toLowerCase();
    this.props.setLocation(location);
  }

  setSearch(e) {
    this.setState({searchActive: !this.state.searchActive});
    e.currentTarget.parentElement.children[1].children[0].focus();
  }

  render() {
    return (
      <div className="Nav">
        {this.state.width > 600 ? (
          <div className="nav-container-desktop">
            <a href="/#/" onClick={this.setLocation}>
              <img className="logo" src={logo} />
            </a>
            <div className="links">
              <a style={this.props.nav.location === "contact" ? {color: '#44B1DE'} : null} 
                href="/#/contact" onClick={this.setLocation}>CONTACT</a>
              <a style={this.props.nav.location === "shop" ? {color: '#44B1DE'} : null} 
                 href="/#/shop" onClick={this.setLocation}>SHOP</a>
              <div className="search">
                <img onClick={this.setSearch} className="search-button" src={search} />
                <form>
                  <input className="search-bar" type="text" 
                    style={this.state.searchActive ? {
                      width: '150px'
                  } : null} />
                </form>
              </div>
              {this.props.cart.products.length > 0 ? (
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteBlue} />
              ) : (
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteGray} />
              )}
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

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    nav: state.nav
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
