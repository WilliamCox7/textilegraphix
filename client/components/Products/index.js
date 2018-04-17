import { React, Component, connect } from '../../packages';
import { ProductNav, Product, ProductNavMobile } from '../';
import { showAt, hideAt } from '../modules';
import './style.scss';

class Products extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',
      overlay: false
    }
    this.setFilter = this.setFilter.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  setFilter(filter) {
    var newState = Object.assign({}, this.state);
    newState.filter = filter;
    this.setState(newState);
  }

  toggleOverlay() {
    this.setState({overlay: !this.state.overlay});
  }

  render() {

    let products = [];

    if (this.props.products) {
      products = this.props.products.map((product, i) => {
        if (!this.state.filter || product.type === this.state.filter) {
          return <Product product={product} key={i} />;
        }
      });
    }

    return (
      <div className="Products">
        <div className="products-container">
          <div style={showAt(1200, this.props.window.w)}>
            <ProductNav setFilter={this.setFilter} filter={this.state.filter} />
          </div>
          <div style={hideAt(1130, this.props.window.w)}>
            <ProductNavMobile toggleOverlay={this.toggleOverlay}
              setFilter={this.setFilter} filter={this.state.filter} />
          </div>
          <div className="products flex fw-w jc-fs">
            {products}
          </div>
        </div>
        {this.state.overlay ? (
          <div className="gray-overlay"></div>
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
