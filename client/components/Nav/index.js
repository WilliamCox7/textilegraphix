import { React, Component, Link, MediaQuery, connect } from '../../packages';
import { getAsset } from '../../modules';
import { ProductBuilder, Menu } from '../';
import './style.scss';

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
    this.closeAll = this.closeAll.bind(this);
    this.cancelBuilder = this.cancelBuilder.bind(this);
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

  setProduct(product) {
    this.setState({product: product});
    this.toggleBuilder();
  }

  toggleMenu() {
    this.setState({menu: !this.state.menu}, () => {
      this.state.menu
        ? document.body.style.position = 'fixed'
        : document.body.style.position = 'inherit';
    });
  }

  toggleSearchInput() {
    this.setState({searchActive: !this.state.searchActive}, () => {
      if (this.state.searchActive) {
        document.getElementsByClassName('search-input')[0].focus();
      }
    });
  }

  toggleOverlay() {
    this.setState({overlay: !this.state.overlay}, () => {
      let className;
      if (window.location.pathname === '/') className = 'Home';
      else if (window.location.pathname === '/products') className = 'Products';
      else if (window.location.pathname === '/support') className = 'Support';
      else if (window.location.pathname === '/order') className = 'Order';
      this.state.overlay
        ? document.getElementsByClassName(className)[0].style.position = 'fixed'
        : document.getElementsByClassName(className)[0].style.position = 'inherit';
    });
  }

  updateSearchText(e) {
    this.setState({searchText: e.target.value});
  }

  toggleBuilder() {
    this.setState({builder: !this.state.builder});
    this.toggleOverlay();
  }

  cancelBuilder() {
    this.setState({builder: false, overlay: false}, () => {
      let className;
      if (window.location.pathname === '/') className = 'Home';
      else if (window.location.pathname === '/products') className = 'Products';
      else if (window.location.pathname === '/support') className = 'Support';
      else if (window.location.pathname === '/order') className = 'Order';
      document.getElementsByClassName(className)[0].style.position = 'inherit';
    });
  }

  closeAll() {
    this.setState({overlay: false, builder: false});
  }

  render() {

    let searchResults = this.props.products.reduce((filtered, product, i) => {
      if (JSON.stringify(product).toLowerCase().indexOf(this.state.searchText.toLowerCase()) > -1 && i < 10 && this.state.searchText) {
        filtered.push(
          <div onClick={() => this.setProduct(product)} key={i} className="search-product flex ai-c">
            <span>
              <img src={product.thumbnail} />
            </span>
            <h1 className="fs-18 c-gray-1">{product.brand} {product.number}</h1>
          </div>
        );
      }
      return filtered;
    }, []);

    return (
      <div className="nav-wrapper">
        <div className="Nav flex jc-sb ai-c">
          <hr />
          <MediaQuery maxWidth={1150}>
            <button onClick={this.toggleMenu} className="fs-12 c-white">MENU</button>
          </MediaQuery>
          {this.state.menu ? (
            <Menu toggleMenu={this.toggleMenu} cancelBuilder={this.cancelBuilder} />
          ) : null}
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
            <div className="gray-overlay" onClick={this.closeAll}></div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    products: state.products
  }
}

export default connect(mapStateToProps)(Nav);
