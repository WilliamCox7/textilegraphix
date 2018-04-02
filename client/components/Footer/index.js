import { React, Component, Link } from '../../packages';
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
          <a href="" target="_blank">
            <img className="social" src={fb} />
          </a>
          <a href="" target="_blank">
            <img className="social" src={insta} />
          </a>
          <p>Copyright 2018. Textile Graphix, LLC</p>
        </div>
      </div>
    );
  }
}

export default Footer;
