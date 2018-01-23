import { React, Component, connect } from '../../packages';
import { setLocation } from '../../reducers/nav';
import { setModal } from '../../reducers/modal';
import { setProduct } from '../../reducers/product';
import './SearchResults.scss';

class SearchResults extends Component {

  constructor() {
    super();
    this.selectProduct = this.selectProduct.bind(this);
  }

  selectProduct(product) {
    this.props.setModal(true);
    this.props.setProduct(product);
    this.props.resetSearchText();
  }

  render() {

    var count = 0, results = [];
    this.props.shop.products.forEach((product, i) => {
      if (JSON.stringify(product).indexOf(this.props.searchTxt) > -1 && count < 7) {
        count++;
        results.push(
          <a href="/#/shop" className="result" key={i} onClick={() => {
            this.selectProduct(product); this.props.setLocation('shop');}}>
            <img src={product.image} />
            <span>
              {product.brand}
            </span>
            <span>
              {product.number}
            </span>
          </a>
        );
      }
    });

    return (
      <div className="SearchResults">
        {results.length > 0 ? results : (
          <div className="error">no results for "{this.props.searchTxt}"</div>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop
  }
}

const mapDispatchToProps = {
  setModal: setModal,
  setProduct: setProduct,
  setLocation: setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
