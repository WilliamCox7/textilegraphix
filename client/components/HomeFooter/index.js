import React, { Component } from 'react';
import SocialMedia from '../SocialMedia';
import { getAsset } from '../../modules';
import './style.scss';

class HomeFooter extends Component {

  componentDidMount() {
    this.setFooter();
  }

  componentWillUpdate() {
    this.setFooter();
  }

  setFooter() {
    let bodyHeight = window.innerHeight;
    let footer = document.getElementById('HomeFooter');
    footer.style.bottom = 'initial';
    let footerBottom = footer.getBoundingClientRect().bottom;
    if (footerBottom < bodyHeight) {
      footer.style.bottom = 0;
    }
  }

  render() {
    return (
      <div id="HomeFooter" className="flex jc-c">
        <div id="footer-container" className="flex jc-c fd-c ai-c">
          <div id="logo-container">
            <img id="footer-logo" src={getAsset('logo-text-white')} />
          </div>
          <SocialMedia color="white" />
          <hr />
          <h1>Copyright 2018. Textile Graphix, LLC</h1>
        </div>
      </div>
    );
  }
}

export default HomeFooter;
