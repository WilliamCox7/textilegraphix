import { React, Component, Link, MediaQuery } from '../../packages';
import { SocialMedia } from '../';
import { logoWhite, fb, insta } from '../../assets';
import './style.scss';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="wrapper flex ai-fe">
          <Link to="/" className="logo">
            <img src={logoWhite} />
          </Link>
          <MediaQuery minWidth={755}>
            <SocialMedia color="white" />
          </MediaQuery>
          <p className="fs-25 c-white">Copyright 2018. Textile Graphix, LLC</p>
        </div>
      </div>
    );
  }
}

export default Footer;
