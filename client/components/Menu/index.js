import { React, Component, Link } from '../../packages';
import { closeX, fb, insta } from '../../assets';
import './style.scss';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="close flex jc-fe ai-c">
          <h1 className="fs-36 c-blue">MENU</h1>
          <img onClick={this.props.toggleMenu} src={closeX} />
        </div>
        <div className="links flex jc-sa fd-c ai-c">
          <Link onClick={this.props.toggleMenu} to="/" className="fs-40 c-white">
            HOME
          </Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="products" className="fs-40 c-white">
            PRODUCTS
          </Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="support" className="fs-40 c-white">
            SUPPORT
          </Link>
          <hr />
          <div className="social-links flex jc-c">
            <a href="https://www.facebook.com/textilegraphix/" target="_blank">
              <img src={fb} />
            </a>
            <a href="https://www.instagram.com/textilegraphix/" target="_blank">
              <img src={insta} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
