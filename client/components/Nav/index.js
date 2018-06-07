import { React, Component, Link, MediaQuery, connect } from '../../packages';
import { getAsset } from '../../modules';
import { ProductBuilder, Menu } from '../';
import './style.scss';

import * as method from './methods';
import SearchResult from './SearchResult';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      menu: false,
      searchActive: false,
      searchText: '',
      overlay: false,
      builder: false,
      product: undefined
    }
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearchInput = this.toggleSearchInput.bind(this);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.toggleBuilder = this.toggleBuilder.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.cancelBuilder = this.cancelBuilder.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", (e) => {
      if (e.target.className.indexOf('fa-search') === -1 &&
          e.target.className.indexOf('search-input') === -1 &&
          this.state.searchActive) {
        this.setState({searchActive: false});
      }
    });
  }

  render() {

    let searchResults = this.props.products.reduce((filtered, product, i) => {
      if (JSON.stringify(product).toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 && i < 10 && this.state.searchText) {
        filtered.push(<SearchResult product={product} setProduct={this.setProduct} key={i} />);
      }
      return filtered;
    }, []);

    return (
      <div className="nav-wrapper">
        <div className="Nav flex jc-sb ai-c">
          <hr />

          {/* Mobile Menu */}
          <MediaQuery maxWidth={1150}>
            <button onClick={this.toggleMenu} className="fs-12 c-white">MENU</button>
          </MediaQuery>
          {this.state.menu ? (
            <Menu toggleMenu={this.toggleMenu} cancelBuilder={this.cancelBuilder} />
          ) : null}

          {/* Desktop Menu */}
          <Link to="/" onClick={this.cancelBuilder}>
            <img className="logo" src={getAsset('logo-text-black')} />
          </Link>
          <div className="flex ai-c">
            <MediaQuery className="routes" minWidth={1150}>
              <Link to="products" onClick={this.cancelBuilder} className="fs-20 c-black fw-bold">
                Products
              </Link>
              <Link to="support" onClick={this.cancelBuilder} className="fs-20 c-black fw-bold">
                Support
              </Link>
            </MediaQuery>
            <MediaQuery className="search flex ai-c" minWidth={770}>
              <i onClick={this.toggleSearchInput} className="fas fa-search fs-20 c-black fw-bold"></i>
              <input className="search-input" style={this.state.searchActive ? {"width": "130px"} : null}
                type="text" placeholder="search..." onChange={this.updateSearchText} />
              {this.state.searchActive && this.state.searchText && searchResults.length ? (
                <div className="search-results">
                  {searchResults}
                </div>
              ) : null}
            </MediaQuery>
            <Link to="order" className="cart" onClick={this.cancelBuilder}>
              <img src={getAsset('shopping-cart')} />
              <span className="flex jc-c ai-c">{this.props.cart.orders.length}</span>
            </Link>
          </div>
        </div>
        <div className="product-builder-positioner">
          {this.state.builder ? (
            <ProductBuilder toggleBuilder={this.toggleBuilder} product={this.state.product} />
          ) : null}
          {this.state.overlay ? (
            <div className="gray-overlay" onClick={this.cancelBuilder}></div>
          ) : null}
        </div>
      </div>
    );
  }
}

Nav.prototype.toggleMenu = method.toggleMenu;
Nav.prototype.toggleSearchInput = method.toggleSearchInput;
Nav.prototype.updateSearchText = method.updateSearchText;
Nav.prototype.toggleBuilder = method.toggleBuilder;
Nav.prototype.setProduct = method.setProduct;
Nav.prototype.cancelBuilder = method.cancelBuilder;
Nav.prototype.toggleOverlay = method.toggleOverlay;

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(mapStateToProps)(Nav);
