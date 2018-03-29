import { React, Component, Link } from '../../packages';
import { logoTextBlack, searchIcon, shoppingCart } from '../../assets';
import './style.scss';

class Nav extends Component {
  render() {
    return (
      <div className="Nav flex jc-sb ai-c">
        <Link to="/">
          <img className="logo" src={logoTextBlack} />
        </Link>
        <div className="flex ai-c">
          <div className="routes">
            <Link to="products">
              Products
            </Link>
            <Link to="support">
              Support
            </Link>
          </div>
          <i className="fas fa-search"></i>
          <Link to="order" className="cart">
            <img src={shoppingCart} />
            <span>0</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
