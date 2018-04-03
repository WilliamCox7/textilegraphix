import { React, Component, connect } from '../../packages';
import { ProductNav, Product } from '../';
import './style.scss';

class Products extends Component {

  constructor() {
    super();
    this.state = {
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

    var products = this.props.products.products.map((product, i) => {
      if (!this.state.filter || product.type === this.state.filter) {
        return <Product product={product} key={i} />;
      }
    });

    return (
      <div className="Products">
        <div className="products-container">
          <ProductNav setFilter={this.setFilter} filter={this.state.filter} />
          <div className="products flex fw-w jc-fs">
            {products}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
