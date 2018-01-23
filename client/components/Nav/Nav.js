import { Component, connect } from '../../packages';
import { template, construct, componentDidMount, mapDispatchToProps, mapStateToProps } from './modules';
import './Nav.scss';

class Nav extends Component {

  constructor() {
    super();
    construct(this);
  }

  componentDidMount() {
<<<<<<< HEAD
    componentDidMount(this);
  }

  render() {
    return template(this);
=======
    var location = hashHistory.getCurrentLocation().pathname;
    location = location.split("/")[1];
    this.props.setLocation(location);
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
              <img className="logo" src={logo} />
            </a>
            <div className="links">
              <a style={this.props.nav.location === "contact" ? {color: '#44B1DE'} : null} 
                href="/#/contact" onClick={this.setLocation}>CONTACT</a>
              <a style={this.props.nav.location === "shop" ? {color: '#44B1DE'} : null} 
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
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteBlue} />
              ) : (
                <img onClick={this.showQuoteBox} className="quote-icon" src={quoteGray} />
              )}
              {this.state.showQuoteBox ? (<QuoteBox />) : null}
            </div>
          </div>
        ) : (
          "Mobile"
        )}
      </div>
    );
>>>>>>> parent of aef9be6... fixed search links
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
