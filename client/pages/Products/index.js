import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAsset, toggle, calculateTotalCost, updateCost } from '../../modules';
import ProductNav from '../../components/ProductNav';
import Product from '../../components/Product';
import ColorUpdater from '../../components/ColorUpdater';
import MainFooter from '../../components/MainFooter';
import ProductNavMobile from '../../components/ProductNavMobile';
import MediaQuery from 'react-responsive';
import { initializeBuilder } from '../../reducers/builder';
import * as methods from './methods';
import './style.scss';

class Products extends Component {

  constructor() {
    super();
    this.state = {
      filter: '',
      showFilter: false,
      overlay: false,
      sort: '',
      showSort: false,
      extraMargin: 0,
      productBuilderInit: {
        frontColors: 0,
        backColors: 0,
        leftSleeveColors: 0,
        rightSleeveColors: 0,
        total: 0,
        totalPerShirt: 0,
        quantity: 1
      }
    }
    this.setFilter = this.setFilter.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.incrimentColor = this.incrimentColor.bind(this);
    this.decrimentColor = this.decrimentColor.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setSort = this.setSort.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.updateCost = this.updateCost.bind(this);
    this.sortLowestPrice = this.sortLowestPrice.bind(this);
    this.sortHighestPrice = this.sortHighestPrice.bind(this);
    this.sortAtoZ = this.sortAtoZ.bind(this);
    this.sortBestSeller = this.sortBestSeller.bind(this);
    this.sortDefault = this.sortDefault.bind(this);
  }

  render() {

    let products = [];

    if (this.props.inventory.products.length) {
      this.props.inventory.products.forEach((product) => {
        let results = calculateTotalCost(this.state.productBuilderInit, product.costOfShirt);
        product.costPerShirt = results.costPerShirt;
      });
      if (this.state.sort === 'low') this.props.inventory.products.sort(this.sortLowestPrice);
      else if (this.state.sort === 'high') this.props.inventory.products.sort(this.sortHighestPrice);
      else if (this.state.sort === 'atoz') this.props.inventory.products.sort(this.sortAtoZ);
      else if (this.state.sort === 'best') this.props.inventory.products.sort(this.sortBestSeller);
      else this.props.inventory.products.sort(this.sortDefault);
      products = this.props.inventory.products.map((product, i) => {
        if (!this.state.filter || product.type === this.state.filter) {
          return (
            <Product product={product} key={i} setProduct={this.setProduct} />
          );
        }
      });
      products.push(<div className="fake-product"></div>);
      products.push(<div className="fake-product"></div>);
      products.push(<div className="fake-product"></div>);
      products.push(<div className="fake-product"></div>);
      products.push(<div className="fake-product"></div>);
    }

    return (
      <div id="Products">
        <MediaQuery maxWidth={1300}>
          <div id="product-mobile-nav-wrapper">
            <ProductNavMobile toggle={this.toggle} productBuilderInit={this.state.productBuilderInit}
              setFilter={this.setFilter} filter={this.state.filter} updateQuantity={this.updateQuantity} setSort={this.setSort}
              showFilter={this.state.showFilter} sort={this.state.sort}
              decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
          </div>
        </MediaQuery>
        <div id="products-page-wrapper" className="flex">
          <MediaQuery minWidth={1300}>
            <ProductNav setFilter={this.setFilter} />
          </MediaQuery>
          <div id="products-body-wrapper">
            <MediaQuery minWidth={1300}>
              <div id="products-options" className="flex">
                <div id="qty-input" className="flex ai-c">
                  <label>QTY:</label>
                  <input type="text" value={this.state.productBuilderInit.quantity} onChange={this.updateQuantity} />
                </div>
                <ColorUpdater label="Front" location="front" numColors={this.state.productBuilderInit.frontColors}
                  decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
                <ColorUpdater label="Back" location="back" numColors={this.state.productBuilderInit.backColors}
                  decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
                <ColorUpdater label="Left Sleeve" location="leftSleeve" numColors={this.state.productBuilderInit.leftSleeveColors}
                  decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
                <ColorUpdater label="Right Sleeve" location="rightSleeve" numColors={this.state.productBuilderInit.rightSleeveColors}
                  decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
                <div id="sort-by" className="flex ai-c" onClick={() => this.toggle('showSort')}>
                  <img src={getAsset('sort-by')} />
                  <h1>SORT BY</h1>
                </div>
                {this.state.showSort ? (
                  <div id="sort-box" className="flex fd-c">
                    <span onClick={() => this.setSort('low')}>Lowest Price</span>
                    <span onClick={() => this.setSort('high')}>Highest Price</span>
                    <span onClick={() => this.setSort('atoz')}>A-Z</span>
                    <span onClick={() => this.setSort('best')}>Best Sellers</span>
                  </div>
                ) : null}
              </div>
            </MediaQuery>
            <div id="products-wrapper" className="flex fw-w jc-sb">
              {products}
            </div>
          </div>
        </div>
        {this.state.overlay ? (
          <div className="gray-overlay" onClick={() => {
            this.toggle('showFilter', 'overlay');
            document.body.style.position = 'relative';
          }}></div>
        ) : null}
        <MainFooter />
      </div>
    );
  }
}

Products.prototype.setFilter = methods.setFilter;
Products.prototype.updateQuantity = methods.updateQuantity;
Products.prototype.incrimentColor = methods.incrimentColor;
Products.prototype.decrimentColor = methods.decrimentColor;
Products.prototype.toggle = toggle;
Products.prototype.setSort = methods.setSort;
Products.prototype.setProduct = methods.setProduct;
Products.prototype.closeAll = methods.closeAll;
Products.prototype.updateCost = updateCost;
Products.prototype.sortLowestPrice = methods.sortLowestPrice;
Products.prototype.sortHighestPrice = methods.sortHighestPrice;
Products.prototype.sortAtoZ = methods.sortAtoZ;
Products.prototype.sortBestSeller = methods.sortBestSeller;
Products.prototype.sortDefault = methods.sortDefault;

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory
  }
}

const mapDispatchToProps = {
  initializeBuilder: initializeBuilder
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
