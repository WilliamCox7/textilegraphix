import { React } from '../../../packages';
import { QuoteBox, SearchResults } from '../../index';
import { logoGray, quoteIconBlue, quoteIconGray, search } from '../../../assets';

export function template(Nav) {
  return (
    <div className="Nav">
      {Nav.state.width > 600 ? (
        <div className="nav-container-desktop">
          <a href="/#/" onClick={() => Nav.setLocation("")}>
            <img className="logo" src={logoGray} />
          </a>
          <div className="links">
            <a className="link" style={Nav.props.nav.location === "contact" ? {color: '#44B1DE'} : null}
              href="/#/contact" onClick={() => Nav.setLocation("contact")}>CONTACT</a>
            <a className="link" style={Nav.props.nav.location === "shop" ? {color: '#44B1DE'} : null}
               href="/#/shop" onClick={() => Nav.setLocation("shop")}>SHOP</a>
            <div className="search">
              <img onClick={Nav.setSearch} className="search-button" src={search} />
              <form>
                <input className="search-bar" type="text" value={Nav.state.searchTxt}
                  style={Nav.state.searchActive ? {
                    width: '150px'
                } : null} onChange={Nav.updateSrch} />
              </form>
              {Nav.state.searchTxt && Nav.state.searchActive ? (
                <SearchResults searchTxt={Nav.state.searchTxt}
                  resetSearchText={Nav.resetSearchText} />
              ) : null}
            </div>
            {Nav.props.cart.products.length > 0 ? (
              <img onClick={Nav.showQuoteBox} className="quote-icon" src={quoteIconBlue} />
            ) : (
              <img onClick={Nav.showQuoteBox} className="quote-icon" src={quoteIconGray} />
            )}
            {Nav.state.showQuoteBox ? (<QuoteBox />) : null}
          </div>
        </div>
      ) : (
        "Mobile"
      )}
    </div>
  );
}
