import { React, Component, Link, MediaQuery } from '../../packages';
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
          <MediaQuery className="social-media" minWidth={755}>
            <a href="https://www.facebook.com/textilegraphix/" target="_blank">
              <img className="social" src={fb} />
            </a>
            <a href="https://www.instagram.com/textilegraphix/" target="_blank">
              <img className="social" src={insta} />
            </a>
          </MediaQuery>
          <p className="fs-25 c-white">Copyright 2018. Textile Graphix, LLC</p>
        </div>
      </div>
    );
  }
}

export default Footer;
