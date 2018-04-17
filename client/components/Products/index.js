import { React, Component, connect } from '../../packages';
import { ProductNav, Product, ProductNavMobile, ProductBuilder } from '../';
import { showAt, hideAt } from '../modules';
import './style.scss';

class Products extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',
      showFilter: false,
      overlay: false,
      builder: false,
      product: undefined
    }
    this.setFilter = this.setFilter.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.toggleBuilder = this.toggleBuilder.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.toggleShowFilter = this.toggleShowFilter.bind(this);
  }

  setFilter(filter) {
    var newState = Object.assign({}, this.state);
    newState.filter = filter;
    this.setState(newState);
  }

  setProduct(product) {
    console.log(product);
    this.setState({product: product});
    this.toggleBuilder();
  }

  toggleOverlay() {
    this.setState({overlay: !this.state.overlay});
  }

  toggleBuilder() {
    this.setState({builder: !this.state.builder});
    this.toggleOverlay();
  }

  toggleShowFilter() {
    this.setState({showFilter: !this.state.showFilter});
  }

  closeAll() {
    this.setState({overlay: false, builder: false, showFilter: false});
  }

  render() {

    let products = [];

    if (this.props.products) {
      products = this.props.products.map((product, i) => {
        if (!this.state.filter || product.type === this.state.filter) {
          return <Product product={product} key={i} setProduct={this.setProduct} />;
        }
      });
    }

    return (
      <div className="Products">
        <div className="products-container">
          <div style={showAt(1200, this.props.window.w)}>
            <ProductNav setFilter={this.setFilter} filter={this.state.filter} />
          </div>
          <div style={hideAt(1200, this.props.window.w)}>
            <ProductNavMobile toggleOverlay={this.toggleOverlay}
              setFilter={this.setFilter} filter={this.state.filter}
              showFilter={this.state.showFilter} toggleShowFilter={this.toggleShowFilter} />
          </div>
          {this.state.builder ? (
            <div style={showAt(1200, this.props.window.w)}>
              <ProductBuilder toggleBuilder={this.toggleBuilder} product={this.state.product} />
            </div>
          ) : null}
          <div className="products flex fw-w jc-fs">
            {products}
          </div>
        </div>
        {this.state.overlay ? (
          <div className="gray-overlay" onClick={this.closeAll}></div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products,
    window: state.window
  }
}

export default connect(mapStateToProps)(Products);
