import { React, Component, connect, MediaQuery } from '../../packages';
import { ProductNav, Product, ProductNavMobile, ProductBuilder } from '../';
import { calculateTotalCost } from '../_modules';
import './style.scss';

class Products extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',
      showFilter: false,
      overlay: false,
      builder: false,
      product: undefined,
      sort: '',
      showSort: false,
      productBuilderInit: {
        frontColors: 0,
        backColors: 0,
        sleeveColors: 0,
        total: 0,
        totalPerShirt: 0,
        quantity: 1
      }
    }
    this.setFilter = this.setFilter.bind(this);
    this.toggleOverlay = this.toggleOverlay.bind(this);
    this.toggleBuilder = this.toggleBuilder.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.toggleShowFilter = this.toggleShowFilter.bind(this);
    this.incrimentColor = this.incrimentColor.bind(this);
    this.decrimentColor = this.decrimentColor.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.updateCost = this.updateCost.bind(this);
    this.sortLowestPrice = this.sortLowestPrice.bind(this);
    this.sortHighestPrice = this.sortHighestPrice.bind(this);
    this.sortAtoZ = this.sortAtoZ.bind(this);
    this.sortBestSeller = this.sortBestSeller.bind(this);
    this.sortDefault = this.sortDefault.bind(this);
    this.setSort = this.setSort.bind(this);
    this.toggleSort = this.toggleSort.bind(this);
  }

  setFilter(filter) {
    var newState = Object.assign({}, this.state);
    newState.filter = filter;
    this.setState(newState);
  }

  setProduct(product) {
    this.updateCost(product);
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

  updateQuantity(e) {
    if (!isNaN(e.target.value)) {
      let newState = Object.assign({}, this.state);
      newState.productBuilderInit.quantity = Number(e.target.value);
      this.setState(newState);
    }
  }

  incrimentColor(color) {
    let prop = color + "Colors";
    let newState = Object.assign({}, this.state);
    if (newState.productBuilderInit[prop] + 1 < 5) {
      newState.productBuilderInit[prop] = newState.productBuilderInit[prop] + 1;
    }
    this.setState(newState);
  }

  decrimentColor(color) {
    let prop = color + "Colors";
    let newState = Object.assign({}, this.state);
    newState.productBuilderInit[prop] = newState.productBuilderInit[prop] - 1;
    if (newState[prop] < 0) {
      newState[prop] = 0;
    }
    this.setState(newState);
  }

  updateCost(product) {
    let newState = Object.assign({}, this.state);
    let results = calculateTotalCost(this.state.productBuilderInit, product.costOfShirt);
    newState.productBuilderInit.total = results.totalCost;
    newState.productBuilderInit.totalPerShirt = results.costPerShirt;
    this.setState(newState);
  }

  sortLowestPrice(a, b) {
    if (a.costPerShirt < b.costPerShirt) return -1;
    else if (b.costPerShirt < a.costPerShirt) return 1;
    return 0;
  }

  sortHighestPrice(a, b) {
    if (a.costPerShirt > b.costPerShirt) return -1;
    else if (b.costPerShirt > a.costPerShirt) return 1;
    return 0;
  }

  sortAtoZ(a, b) {
    if (a.brand < b.brand) return -1;
    else if (b.brand < a.brand) return 1;
    return 0;
  }

  sortBestSeller(a, b) {
    if (a.ranking > b.ranking) return -1;
    else if (b.ranking > a.ranking) return 1;
    return 0;
  }

  sortDefault(a, b) {
    if (a.type > b.type) return -1;
    else if (b.type > a.type) return 1;
    return 0;
  }

  setSort(sort) {
    let updSort;
    if (this.state.sort === sort) updSort = '';
    else updSort = sort;
    this.setState({ sort: updSort });
    this.toggleSort();
  }

  toggleSort() {
    this.setState({ showSort: !this.state.showSort });
  }

  render() {

    let products = [];

    if (this.props.products) {
      this.props.products.forEach((product) => {
        let results = calculateTotalCost(this.state.productBuilderInit, product.costOfShirt);
        product.costPerShirt = results.costPerShirt;
      });
      if (this.state.sort === 'low') this.props.products.sort(this.sortLowestPrice);
      else if (this.state.sort === 'high') this.props.products.sort(this.sortHighestPrice);
      else if (this.state.sort === 'atoz') this.props.products.sort(this.sortAtoZ);
      else if (this.state.sort === 'best') this.props.products.sort(this.sortBestSeller);
      else this.props.products.sort(this.sortDefault);
      products = this.props.products.map((product, i) => {
        if (!this.state.filter || product.type === this.state.filter) {
          return (
            <Product product={product} costPerShirt={product.costPerShirt}
              key={i} setProduct={this.setProduct} />
          );
        }
      });
    }

    return (
      <div className="Products">
        <div className="body-wrapper">
          <div className="products-container">
            <MediaQuery minWidth={1230}>
              <div className="under-nav-options flex jc-sb ai-c">
                <div className="fs-13 c-white dp-rectangle">DISPLAYED PRICES</div>
                <div className="opt-cell flex ai-c">
                  <h1 className="fs-24 c-gray-3 space-right">QTY:</h1>
                  <input type="text" value={this.state.productBuilderInit.quantity} onChange={this.updateQuantity} />
                </div>
                <div className="opt-cell flex ai-c">
                  <h1 className="fs-14 fw-bold c-black space-right">Front Colors</h1>
                  <div className="bottom-portion flex ai-c jc-c">
                    <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('front')}></i>
                    <h1 className="fs-24 c-black fw-bold">{this.state.productBuilderInit.frontColors}</h1>
                    <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('front')}></i>
                  </div>
                </div>
                <div className="opt-cell flex ai-c">
                  <h1 className="fs-14 fw-bold c-black space-right">Back Colors</h1>
                  <div className="bottom-portion flex ai-c jc-c">
                    <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('back')}></i>
                    <h1 className="fs-24 c-black fw-bold">{this.state.productBuilderInit.backColors}</h1>
                    <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('back')}></i>
                  </div>
                </div>
                <div className="opt-cell flex ai-c">
                  <h1 className="fs-14 fw-bold c-black space-right">Sleeve Colors</h1>
                  <div className="bottom-portion flex ai-c jc-c">
                    <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('sleeve')}></i>
                    <h1 className="fs-24 c-black fw-bold">{this.state.productBuilderInit.sleeveColors}</h1>
                    <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('sleeve')}></i>
                  </div>
                </div>
                <div className="opt-cell">
                  <h1 className="fs-30 c-blue" onClick={this.toggleSort}>SORT BY <i className="fas fa-arrow-down"></i></h1>
                  {this.state.showSort ? (
                    <div className="sort-box flex fd-c">
                      <span className="fs-16 c-blue" onClick={() => this.setSort('low')}>Lowest Price</span>
                      <span className="fs-16 c-blue" onClick={() => this.setSort('high')}>Highest Price</span>
                      <span className="fs-16 c-blue" onClick={() => this.setSort('atoz')}>A-Z</span>
                      <span className="fs-16 c-blue" onClick={() => this.setSort('best')}>Best Sellers</span>
                    </div>
                  ) : null}
                </div>
              </div>
            </MediaQuery>
            <MediaQuery minWidth={1230}>
              <ProductNav setFilter={this.setFilter} filter={this.state.filter} />
            </MediaQuery>
            <MediaQuery maxWidth={1230}>
              <ProductNavMobile toggleOverlay={this.toggleOverlay} productBuilderInit={this.state.productBuilderInit}
                setFilter={this.setFilter} filter={this.state.filter} updateQuantity={this.updateQuantity} setSort={this.setSort}
                showFilter={this.state.showFilter} toggleShowFilter={this.toggleShowFilter} sort={this.state.sort}
                decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
            </MediaQuery>
            {this.state.builder ? (
              <ProductBuilder productBuilderInit={this.state.productBuilderInit}
                toggleBuilder={this.toggleBuilder} product={this.state.product} />
            ) : null}
            <div className="products flex jc-fe">
              <div className="products-wrapper flex fw-w">
                {!this.state.builder ? products : null}
              </div>
            </div>
          </div>
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
    products: state.products
  }
}

export default connect(mapStateToProps)(Products);
