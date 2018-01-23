import { React, Component, connect } from '../../packages';
import { ShopNav, Product, ProductModal } from '../components';
import './Shop.scss';

class Shop extends Component {

  constructor() {
    super();
    this.state = {
      width: document.body.clientWidth,
      filter: ''
    }
    this.setFilter = this.setFilter.bind(this);
  }

  setFilter(filter) {
    var newState = Object.assign({}, this.state);
    newState.filter = filter;
    this.setState(newState);
  }

  render() {

    var products = this.props.shop.products.map((product, i) => {
      if (!this.state.filter || product.type === this.state.filter) {
        return <Product product={product} key={i} />;
      }
    });

    return (
      <div className="Shop">
        {this.state.width > 600 ? (
          <div>
            <h1 className="header">Our Products</h1>
            <div className="products-container">
              <ShopNav setFilter={this.setFilter} filter={this.state.filter} />
              <div className="products">
                {products}
              </div>
            </div>
          </div>
        ) : (
          "Mobile"
        )}
        {this.props.modal.open ? <ProductModal /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop,
    modal: state.modal
  }
}

export default connect(mapStateToProps)(Shop);
