import React, { Component } from 'react';
import logo from '../../src/logo-blue.svg';
import facebook from '../../src/facebook.svg';
import instagram from '../../src/instagram.svg';
import copyright from '../../src/copyright.svg';
import './Footer.scss';

class Footer extends Component {
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
            <a href="/#/contact">CONTACT</a>
            <a href="/#/about">ABOUT</a>
            <a href="/#/shop">SHOP</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
