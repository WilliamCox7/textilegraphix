import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

class SocialMedia extends Component {
  render() {
    return (
      <div id="SocialMedia" className="flex jc-c ai-c">
        <a href="https://www.facebook.com/textilegraphix/" target="_blank">
          <img id="fb-logo" src={getAsset(`fb-${this.props.color}`)} />
        </a>
        <a href="https://www.instagram.com/textilegraphix/" target="_blank">
          <img id="insta-logo" src={getAsset(`insta-${this.props.color}`)} />
        </a>
      </div>
    );
  }
}

export default SocialMedia;
