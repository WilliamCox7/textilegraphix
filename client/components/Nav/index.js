import { React, Component, Link, connect } from '../../packages';
import { logoTextBlack, searchIcon, shoppingCart } from '../../assets';
import { showAt, hideAt } from '../modules';
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

    let w = this.props.window.w;

    return (
      <div className="Nav flex jc-sb ai-c">
        <button onClick={this.toggleMenu} className="menu-button"
          style={hideAt(1040, w)}>MENU</button>
        {this.state.menu ? (
          <Menu toggleMenu={this.toggleMenu} />
        ) : null}
        <Link to="/">
          <img className="logo" src={logoTextBlack} />
        </Link>
        <div className="flex ai-c">
          <div className="routes" style={showAt(1040, w)}>
            <Link to="products">
              Products
            </Link>
            <Link to="support">
              Support
            </Link>
          </div>
          <i className="fas fa-search" style={showAt(770, w)}></i>
          <Link to="order" className="cart">
            <img src={shoppingCart} />
            <span className="flex jc-c ai-c">0</span>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    window: state.window
  }
}

export default connect(mapStateToProps)(Nav);
