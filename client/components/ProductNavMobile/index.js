import { React, Component } from '../../packages';
import { getAsset } from '../../modules';
import './style.scss';

const active = {"background": "#44B1DE", "border": "none"};

class ProductNavMobile extends Component {

  constructor() {
    super();
    this.setFilter = this.setFilter.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  setFilter(filter) {
    if (this.props.filter === filter) {
      filter = '';
    }
    this.props.setFilter(filter);
  }

  toggleFilter() {
    this.props.toggleShowFilter();
    this.props.toggleOverlay();
  }

  render() {
    return (
      <div className="ProductNavMobile" style={this.props.showFilter ? {"background": "white"} : null}>
        <div className="nav-options flex jc-sb">
          <h1 className="fs-12 c-black fw-bold" onClick={this.toggleFilter}>Select a Shirt</h1>
          {!this.props.showFilter ? (
            <h1 onClick={this.toggleFilter} className="fs-12 c-blue fw-bold">
              Filter <i className="fas fa-arrow-down"></i>
            </h1>
          ) : null}
        </div>
        {this.props.showFilter ? (
          <div className="nav-filters-wrapper">
            <div className="nav-filters flex fd-c">
              <div className="filter-thumbs flex fw-w">
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('t-shirts')}
                  style={this.props.filter === 't-shirts' ? active : null}>
                  <img src={getAsset(this.props.filter === 't-shirts' ? 't-shirt-thumb-white' : 't-shirt-thumb')} />
                  <h1 className="fs-12 c-blue fw-bold" style={this.props.filter === 't-shirts' ? {"color": "white"} : null}>T-Shirts</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('long sleeve shirt')}
                  style={this.props.filter === 'long sleeve shirt' ? active : null}>
                  <img src={getAsset(this.props.filter === 'long sleeve shirt' ? 'long-sleeve-thumb-white' : 'long-sleeve-thumb')} />
                  <h1 className="fs-12 c-blue fw-bold" style={this.props.filter === 'long sleeve shirt' ? {"color": "white"} : null}>Long Sleeves</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('hoodies')}
                  style={this.props.filter === 'hoodies' ? active : null}>
                  <img src={getAsset(this.props.filter === 'hoodies' ? 'hoodie-thumb-white' : 'hoodie-thumb')} />
                  <h1 className="fs-12 c-blue fw-bold" style={this.props.filter === 'hoodies' ? {"color": "white"} : null}>Hoodies</h1>
                </span>
                <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('sweaters')}
                  style={this.props.filter === 'sweaters' ? active : null}>
                  <img src={getAsset(this.props.filter === 'sweaters' ? 'sweater-thumb-white' : 'sweater-thumb')} />
                  <h1 className="fs-12 c-blue fw-bold" style={this.props.filter === 'sweaters' ? {"color": "white"} : null}>Sweaters</h1>
                </span>
              </div>
              <div className="under-nav-options">
                <div className="flex jc-sb row-1">
                  <div className="fs-13 c-white dp-rectangle">DISPLAYED PRICES</div>
                  <div className="opt-cell flex ai-c">
                    <h1 className="fs-24 c-gray-3 space-right">QTY:</h1>
                    <input type="text" value={this.props.productBuilderInit.quantity} onChange={this.props.updateQuantity} />
                  </div>
                </div>
                <div className="flex jc-sb fw-w">
                  <div className="color-cell opt-cell flex ai-c">
                    <h1 className="fs-14 fw-bold c-black space-right">Front Colors</h1>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus fs-12 c-blue" onClick={() => this.props.decrimentColor('front')}></i>
                      <h1 className="fs-24 c-black fw-bold">{this.props.productBuilderInit.frontColors}</h1>
                      <i className="fas fa-plus fs-12 c-blue" onClick={() => this.props.incrimentColor('front')}></i>
                    </div>
                  </div>
                  <div className="color-cell opt-cell flex ai-c">
                    <h1 className="fs-14 fw-bold c-black space-right">Back Colors</h1>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus fs-12 c-blue" onClick={() => this.props.decrimentColor('back')}></i>
                      <h1 className="fs-24 c-black fw-bold">{this.props.productBuilderInit.backColors}</h1>
                      <i className="fas fa-plus fs-12 c-blue" onClick={() => this.props.incrimentColor('back')}></i>
                    </div>
                  </div>
                  <div className="color-cell opt-cell flex ai-c">
                    <h1 className="fs-14 fw-bold c-black space-right">Sleeve Colors</h1>
                    <div className="bottom-portion flex ai-c jc-c">
                      <i className="fas fa-minus fs-12 c-blue" onClick={() => this.props.decrimentColor('sleeve')}></i>
                      <h1 className="fs-24 c-black fw-bold">{this.props.productBuilderInit.sleeveColors}</h1>
                      <i className="fas fa-plus fs-12 c-blue" onClick={() => this.props.incrimentColor('sleeve')}></i>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="fs-14 c-black fw-bold">Sort By</div>
                <div className="opt-cell flex jc-sb sort-row">
                  <span className="fs-14 c-blue" onClick={() => this.props.setSort('low')} style={this.props.sort === 'low' ? {"background": "#44B1DE", "color": "white"} : null}>LOWEST PRICE</span>
                  <span className="fs-14 c-blue" onClick={() => this.props.setSort('high')} style={this.props.sort === 'high' ? {"background": "#44B1DE", "color": "white"} : null}>HIGHEST PRICE</span>
                  <span className="fs-14 c-blue" onClick={() => this.props.setSort('atoz')} style={this.props.sort === 'atoz' ? {"background": "#44B1DE", "color": "white"} : null}>A-Z</span>
                  <span className="fs-14 c-blue" onClick={() => this.props.setSort('best')} style={this.props.sort === 'best' ? {"background": "#44B1DE", "color": "white"} : null}>BEST SELLERS</span>
                </div>
              </div>
              <div className="filter-button" onClick={this.toggleFilter}>
                <h1 className="fs-12 c-blue fw-bold">Filter <i className="fas fa-arrow-up"></i></h1>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductNavMobile;
