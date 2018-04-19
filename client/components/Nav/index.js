import { React, Component, Link, MediaQuery } from '../../packages';
import { logoTextBlack, searchIcon, shoppingCart } from '../../assets';
import { Menu } from '../';
import './style.scss';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      menu: false
    }
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({menu: !this.state.menu}, () => {
      this.state.menu
        ? document.body.style.position = 'fixed'
        : document.body.style.position = 'inherit';
    });
  }

  render() {
    return (
      <div className="Nav flex jc-sb ai-c">
        <MediaQuery maxWidth={650}>
          <hr />
        </MediaQuery>
        <MediaQuery maxWidth={1040}>
          <button onClick={this.toggleMenu} className="menu-button">MENU</button>
        </MediaQuery>
        {this.state.menu ? (
          <Menu toggleMenu={this.toggleMenu} />
        ) : null}
        <Link to="/">
          <img className="logo" src={logoTextBlack} />
        </Link>
        <div className="flex ai-c">
          <MediaQuery className="routes" minWidth={1040}>
            <Link to="products">
              Products
            </Link>
            <Link to="support">
              Support
            </Link>
          </MediaQuery>
          <MediaQuery minWidth={770}>
            <i className="fas fa-search"></i>
          </MediaQuery>
          <Link to="order" className="cart">
            <img src={shoppingCart} />
            <span className="flex jc-c ai-c">0</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Nav;
