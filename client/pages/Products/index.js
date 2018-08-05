import React, { Component } from 'react';
import { getAsset, toggle } from '../../modules';
import ProductNav from '../../components/ProductNav';
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
  }

  render() {
    return (
      <div id="Products">
        <div id="products-page-wrapper" className="flex">
          <ProductNav />
          <div id="products-body-wrapper">
            <div id="products-options" className="flex">
              <div id="qty-input" className="flex ai-c">
                <label>QTY:</label>
                <input type="text" value={this.state.productBuilderInit.quantity} onChange={this.updateQuantity} />
              </div>
              <div className="color-updater flex jc-c">
                <label>Front Colors</label>
                <div className="button-wrapper flex ai-c jc-c">
                  <i className="fas fa-minus" onClick={() => this.decrimentColor('front')}></i>
                  <h1>{this.state.productBuilderInit.frontColors}</h1>
                  <i className="fas fa-plus" onClick={() => this.incrimentColor('front')}></i>
                </div>
              </div>
              <div className="color-updater flex jc-c">
                <label>Back Colors</label>
                <div className="button-wrapper flex ai-c jc-c">
                  <i className="fas fa-minus" onClick={() => this.decrimentColor('back')}></i>
                  <h1>{this.state.productBuilderInit.backColors}</h1>
                  <i className="fas fa-plus" onClick={() => this.incrimentColor('back')}></i>
                </div>
              </div>
              <div className="color-updater flex jc-c">
                <label>Left Sleeve Colors</label>
                <div className="button-wrapper flex ai-c jc-c">
                  <i className="fas fa-minus" onClick={() => this.decrimentColor('leftSleeve')}></i>
                  <h1>{this.state.productBuilderInit.leftSleeveColors}</h1>
                  <i className="fas fa-plus" onClick={() => this.incrimentColor('leftSleeve')}></i>
                </div>
              </div>
              <div className="color-updater flex jc-c">
                <label>Right Sleeve Colors</label>
                <div className="button-wrapper flex ai-c jc-c">
                  <i className="fas fa-minus" onClick={() => this.decrimentColor('rightSleeve')}></i>
                  <h1>{this.state.productBuilderInit.rightSleeveColors}</h1>
                  <i className="fas fa-plus" onClick={() => this.incrimentColor('rightSleeve')}></i>
                </div>
              </div>
              <div id="sort-by" className="flex ai-c" onClick={() => this.toggle('showSort')}>
                <img src={getAsset('sort-by')} />
                <h1>SORT BY</h1>
                {this.state.showSort ? (
                  <div id="sort-box" className="flex fd-c">
                    <span onClick={() => this.setSort('low')}>Lowest Price</span>
                    <span onClick={() => this.setSort('high')}>Highest Price</span>
                    <span onClick={() => this.setSort('atoz')}>A-Z</span>
                    <span onClick={() => this.setSort('best')}>Best Sellers</span>
                  </div>
                ) : null}
              </div>
            </div>
            <div id="products-wrapper">

            </div>
          </div>
        </div>
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

export default Products;
