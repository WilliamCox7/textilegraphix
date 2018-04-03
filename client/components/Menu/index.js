import { React, Component, Link } from '../../packages';
import { closeX, fb, insta } from '../../assets';
import './style.scss';

class Menu extends Component {
  render() {
    return (
      <div className="Menu">
        <div className="close flex jc-fe ai-c">
          <h1>MENU</h1>
          <img onClick={this.props.toggleMenu} src={closeX} />
        </div>
        <div className="links flex jc-sa fd-c ai-c">
          <Link onClick={this.props.toggleMenu} to="/">
            HOME
          </Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="products">
            PRODUCTS
          </Link>
          <hr />
          <Link onClick={this.props.toggleMenu} to="support">
            SUPPORT
          </Link>
          <hr />
          <div className="social-links flex jc-c">
            <a href="">
              <img src={fb} />
            </a>
            <a href="">
              <img src={insta} />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
