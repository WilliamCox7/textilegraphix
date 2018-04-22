import { React, Component, Link, MediaQuery, connect } from '../../packages';
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
          <button onClick={this.toggleMenu} className="fs-12 c-white">MENU</button>
        </MediaQuery>
        {this.state.menu ? (
          <Menu toggleMenu={this.toggleMenu} />
        ) : null}
        <Link to="/">
          <img className="logo" src={logoTextBlack} />
        </Link>
        <div className="flex ai-c">
          <MediaQuery className="routes" minWidth={1040}>
            <Link to="products" className="fs-20 c-black fw-bold">
              Products
            </Link>
            <Link to="support" className="fs-20 c-black fw-bold">
              Support
            </Link>
          </MediaQuery>
          <MediaQuery minWidth={770}>
            <i className="fas fa-search fs-20 c-black fw-bold"></i>
          </MediaQuery>
          <Link to="order" className="cart">
            <img src={shoppingCart} />
            <span className="flex jc-c ai-c">{this.props.cart.products.length}</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Nav);
