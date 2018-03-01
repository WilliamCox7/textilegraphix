import { React, Component, connect, hashHistory } from '../../packages';
import { QuoteBox, SearchResults } from '../components';
import { setLocation } from '../../reducers/nav';
import { setCart } from '../../reducers/cart';
import { logoGray, quoteIconBlue, quoteIconGray, search } from '../../assets';
import './Nav.scss';

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth,
      showQuoteBox: false,
      searchActive: false,
      searchTxt: ''
    }
    this.showQuoteBox = this.showQuoteBox.bind(this);
    this.closeQuoteBox = this.closeQuoteBox.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.updateSrch = this.updateSrch.bind(this);
    this.resetSearchText = this.resetSearchText.bind(this);
  }

  componentDidMount() {
    var location = hashHistory.getCurrentLocation().pathname;
    location = location.split("/")[1];
    this.props.setLocation(location);
    var cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.props.setCart(cart.products);
    }
    window.addEventListener("click", (e) => {
      if (e.target.className !== 'search-bar' && e.target.className !== 'search-button') {
        this.setState({searchActive: false});
      }
      if (e.target.className === 'submit') {
        this.closeQuoteBox();
      }
    });
  }

  closeQuoteBox() {
    this.setState({showQuoteBox: false});
  }

  showQuoteBox() {
    this.setState({showQuoteBox: !this.state.showQuoteBox});
  }

  setLocation(e) {
    var location = e.target.innerText.toLowerCase();
    this.props.setLocation(location);
  }

  setSearch(e) {
    this.setState({searchActive: !this.state.searchActive});
    e.currentTarget.parentElement.children[1].children[0].focus();
    this.closeQuoteBox();
  }

  updateSrch(e) {
    this.setState({searchTxt: e.target.value});
    this.closeQuoteBox();
  }

  resetSearchText() {
    this.setState({searchTxt: ''});
  }

  render() {
    return (
      <div className="Nav">
        {this.state.width > 600 ? (
          <div className="nav-container-desktop">
            <a href="/#/" onClick={this.setLocation}>
              <img className="logo" src={logoGray} />
            </a>
            <div className="links">
              <a className="link" style={this.props.nav.location === "contact" ? {color: '#44B1DE'} : null}
                href="/#/contact" onClick={this.setLocation}>CONTACT</a>
              <a className="link" style={this.props.nav.location === "shop" ? {color: '#44B1DE'} : null}
                 href="/#/shop" onClick={this.setLocation}>SHOP</a>
              <div className="search">
                <img onClick={this.setSearch} className="search-button" src={search} />
                <form>
                  <input className="search-bar" type="text" value={this.state.searchTxt}
                    style={this.state.searchActive ? {
                      width: '150px'
                  } : null} onChange={this.updateSrch} />
                </form>
                {this.state.searchTxt && this.state.searchActive ? (
                  <SearchResults searchTxt={this.state.searchTxt}
                    resetSearchText={this.resetSearchText} />
                ) : null}
              </div>
              {this.props.cart.products.length > 0 ? (
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteIconBlue} />
              ) : (
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteIconGray} />
              )}
              {this.state.showQuoteBox ? (<QuoteBox />) : null}
            </div>
          </div>
        ) : (
          "Mobile"
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    nav: state.nav
  }
}

const mapDispatchToProps = {
  setLocation: setLocation,
  setCart: setCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
