import { React, Component, connect, MediaQuery } from '../../packages';
import { ProductNav, Product, ProductNavMobile } from '../../components';
import { calculateTotalCost, toggle, updateCost, setProduct } from '../../modules';
import { initBuilder } from '../../reducers/builder';
import './style.scss';

import * as method from './methods';

class Products extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',
      showFilter: false,
      overlay: false,
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
    this.setProduct = this.setProduct.bind(this);
    this.closeAll = this.closeAll.bind(this);
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
    this.toggle = this.toggle.bind(this);
  }

  render() {

    let products = [];

    if (this.props.products.products.length) {
      this.props.products.products.forEach((product) => {
        let results = calculateTotalCost(this.state.productBuilderInit, product.costOfShirt);
        product.costPerShirt = results.costPerShirt;
      });
      if (this.state.sort === 'low') this.props.products.products.sort(this.sortLowestPrice);
      else if (this.state.sort === 'high') this.props.products.products.sort(this.sortHighestPrice);
      else if (this.state.sort === 'atoz') this.props.products.products.sort(this.sortAtoZ);
      else if (this.state.sort === 'best') this.props.products.products.sort(this.sortBestSeller);
      else this.props.products.products.sort(this.sortDefault);
      products = this.props.products.products.map((product, i) => {
        if (!this.state.filter || product.type === this.state.filter) {
          return (
            <Product product={product} costPerShirt={product.costPerShirt}
              key={i} setProduct={this.setProduct} />
          );
        }
      });
    }

    return (
      <div className="Products" id="current-page">
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
                  <h1 className="fs-30 c-blue" onClick={() => this.toggle('showSort')}>SORT BY <i className="fas fa-arrow-down"></i></h1>
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
            <div className="products flex jc-fe">
              <div className="products-wrapper flex fw-w">
                {products}
              </div>
            </div>
          </div>
          <MediaQuery maxWidth={1230}>
            <ProductNavMobile toggle={this.toggle} productBuilderInit={this.state.productBuilderInit}
              setFilter={this.setFilter} filter={this.state.filter} updateQuantity={this.updateQuantity} setSort={this.setSort}
              showFilter={this.state.showFilter} sort={this.state.sort}
              decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
          </MediaQuery>
          {this.state.overlay ? (
            <div className="gray-overlay" onClick={this.closeAll}></div>
          ) : null}
        </div>
      </div>
    );
  }
}

Products.prototype.setFilter = method.setFilter;
Products.prototype.setProduct = setProduct;
Products.prototype.closeAll = method.closeAll;
Products.prototype.incrimentColor = method.incrimentColor;
Products.prototype.decrimentColor = method.decrimentColor;
Products.prototype.updateQuantity = method.updateQuantity;
Products.prototype.updateCost = updateCost;
Products.prototype.sortLowestPrice = method.sortLowestPrice;
Products.prototype.sortHighestPrice = method.sortHighestPrice;
Products.prototype.sortAtoZ = method.sortAtoZ;
Products.prototype.sortBestSeller = method.sortBestSeller;
Products.prototype.sortDefault = method.sortDefault;
Products.prototype.setSort = method.setSort;
Products.prototype.toggle = toggle;

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = {
  initBuilder: initBuilder
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
