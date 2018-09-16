import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

const active = {"background": "#44B1DE", "border": "none"};

class ProductNavMobile extends Component {

  constructor() {
    super();
    this.toggleProductNav = this.toggleProductNav.bind(this);
  }

  toggleProductNav() {
    if (this.props.showFilter) {
      document.body.style.position = 'relative';
    } else {
      document.body.style.position = 'fixed';
    }
    this.props.toggle('showFilter', 'overlay')
  }

  render() {
    return (
      <div className="ProductNavMobile" style={this.props.showFilter ? {"background": "white"} : null}>
        <div className="nav-options flex jc-sb">
          <h1 onClick={this.toggleProductNav}>Select Product</h1>
          {!this.props.showFilter ? (
            <h1 onClick={this.toggleProductNav}>
              Filter <i className="fas fa-arrow-down"></i>
            </h1>
          ) : null}
        </div>
        {this.props.showFilter ? (
          <div className="nav-filters-wrapper">
            <div className="nav-filters flex fd-c">
              <div className="filter-thumbs flex fw-w">
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.props.setFilter('t-shirts')}
                  style={this.props.filter === 't-shirts' ? active : null}>
                  <img src={getAsset(this.props.filter === 't-shirts' ? 't-shirt-thumb-white' : 't-shirt-thumb')} />
                  <h1 style={this.props.filter === 't-shirts' ? {"color": "white"} : null}>T-Shirts</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.props.setFilter('long sleeve shirt')}
                  style={this.props.filter === 'long sleeve shirt' ? active : null}>
                  <img src={getAsset(this.props.filter === 'long sleeve shirt' ? 'long-sleeve-thumb-white' : 'long-sleeve-thumb')} />
                  <h1 style={this.props.filter === 'long sleeve shirt' ? {"color": "white"} : null}>Long Sleeves</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.props.setFilter('hoodies')}
                  style={this.props.filter === 'hoodies' ? active : null}>
                  <img src={getAsset(this.props.filter === 'hoodies' ? 'hoodie-thumb-white' : 'hoodie-thumb')} />
                  <h1 style={this.props.filter === 'hoodies' ? {"color": "white"} : null}>Hoodies</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.props.setFilter('sweaters')}
                  style={this.props.filter === 'sweaters' ? active : null}>
                  <img src={getAsset(this.props.filter === 'sweaters' ? 'sweater-thumb-white' : 'sweater-thumb')} />
                  <h1 style={this.props.filter === 'sweaters' ? {"color": "white"} : null}>Sweaters</h1>
                </span>
              </div>
              <div className="under-nav-options">
                <div className="flex jc-sb row-1">
                  <div className="dp-rectangle">DISPLAYED PRICES</div>
                  <div className="opt-cell flex ai-c">
                    <h1 className="space-right">QTY:</h1>
                    <input type="text" value={this.props.productBuilderInit.quantity} onChange={this.props.updateQuantity} />
                  </div>
                </div>
                <div className="color-cells flex jc-sb fw-w">
                  <div className="color-cell opt-cell flex ai-c jc-sb">
                    <h2 className="space-right">Front Colors</h2>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus" onClick={() => this.props.decrimentColor('front')}></i>
                      <h3>{this.props.productBuilderInit.frontColors}</h3>
                      <i className="fas fa-plus" onClick={() => this.props.incrimentColor('front')}></i>
                    </div>
                  </div>
                  <div className="color-cell opt-cell flex ai-c jc-sb">
                    <h2 className="space-right">Back Colors</h2>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus" onClick={() => this.props.decrimentColor('back')}></i>
                      <h3>{this.props.productBuilderInit.backColors}</h3>
                      <i className="fas fa-plus" onClick={() => this.props.incrimentColor('back')}></i>
                    </div>
                  </div>
                  <div className="color-cell opt-cell flex ai-c jc-sb">
                    <h2 className="space-right">L Sleeve Colors</h2>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus" onClick={() => this.props.decrimentColor('leftSleeve')}></i>
                      <h3>{this.props.productBuilderInit.leftSleeveColors}</h3>
                      <i className="fas fa-plus" onClick={() => this.props.incrimentColor('leftSleeve')}></i>
                    </div>
                  </div>
                  <div className="color-cell opt-cell flex ai-c jc-sb">
                    <h2 className="space-right">R Sleeve Colors</h2>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus" onClick={() => this.props.decrimentColor('rightSleeve')}></i>
                      <h3>{this.props.productBuilderInit.rightSleeveColors}</h3>
                      <i className="fas fa-plus" onClick={() => this.props.incrimentColor('rightSleeve')}></i>
                    </div>
                  </div>
                </div>
                <hr />
                <h4>Sort By</h4>
                <div className="opt-cell flex jc-sb sort-row">
                  <span onClick={() => this.props.setSort('low')} style={this.props.sort === 'low' ? {"background": "#44B1DE", "color": "white"} : null}>LOWEST PRICE</span>
                  <span onClick={() => this.props.setSort('high')} style={this.props.sort === 'high' ? {"background": "#44B1DE", "color": "white"} : null}>HIGHEST PRICE</span>
                  <span onClick={() => this.props.setSort('atoz')} style={this.props.sort === 'atoz' ? {"background": "#44B1DE", "color": "white"} : null}>A-Z</span>
                  <span onClick={() => this.props.setSort('best')} style={this.props.sort === 'best' ? {"background": "#44B1DE", "color": "white"} : null}>BEST SELLERS</span>
                </div>
              </div>
              <div className="filter-button" onClick={this.toggleProductNav}>
                <h1>Filter <i className="fas fa-arrow-up"></i></h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductNavMobile;
