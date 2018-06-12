import { React, Component, Link, MediaQuery } from '../../packages';
import { SocialMedia } from '../';
import { getAsset } from '../../modules';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <div id="Footer">
        <div className="wrapper flex ai-fe">
          <Link to="/" id="footer-logo">
            <img id="logo-img" src={getAsset('logo-white')} />
          </Link>
          <MediaQuery minWidth={755}>
            <SocialMedia color="white" />
          </MediaQuery>
          <p className="fs-25 c-white">
            Copyright 2018. Textile Graphix, LLC
          </p>
        </div>
      </div>
    );
  }
}

export default Footer;
