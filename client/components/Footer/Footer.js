import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLocation } from '../../reducers/nav';
import logo from '../../src/logo-blue.svg';
import facebook from '../../src/facebook.svg';
import instagram from '../../src/instagram.svg';
import copyright from '../../src/copyright.svg';
import './Footer.scss';

class Footer extends Component {

  constructor() {
    super();
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation(e) {
    var location = e.target.innerText.toLowerCase();
    this.props.setLocation(location);
  }

  render() {
    return (
      <div className="Footer">
        <div className="content">
          <div className="left">
            <img src={logo} />
            <div className="social-media">
              <img src={facebook} />
              <img src={instagram} />
            </div>
            <img src={copyright} />
          </div>
          <div className="right">
            <a href="/#/contact" onClick={this.setLocation}>CONTACT</a>
            <a href="/#/about" onClick={this.setLocation}>ABOUT</a>
            <a href="/#/shop" onClick={this.setLocation}>SHOP</a>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(null, mapDispatchToProps)(Footer);
