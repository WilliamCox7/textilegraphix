import { React, Component } from '../../packages';
import { radioFilled, radioEmpty, hoodieThumb, longSleeveThumb, tShirtThumb, sweaterThumb } from '../../assets';
import './style.scss';

const active = {"background": "#47545d", "border": "none"};

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
    this.toggleFilter();
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
          <div className="nav-filters">
            <div className="filter-thumbs flex fw-w">
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('t-shirts')}
                style={this.props.filter === 't-shirts' ? active : null}>
                <img src={tShirtThumb} />
                <h1 className="fs-12 c-blue fw-bold">T-Shirts</h1>
              </span>
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('long sleeve shirt')}
                style={this.props.filter === 'long sleeve shirt' ? active : null}>
                <img src={longSleeveThumb} />
                <h1 className="fs-12 c-blue fw-bold">Long Sleeves</h1>
              </span>
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('hoodies')}
                style={this.props.filter === 'hoodies' ? active : null}>
                <img src={hoodieThumb} />
                <h1 className="fs-12 c-blue fw-bold">Hoodies</h1>
              </span>
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('sweaters')}
                style={this.props.filter === 'sweaters' ? active : null}>
                <img src={sweaterThumb} />
                <h1 className="fs-12 c-blue fw-bold">Sweaters</h1>
              </span>
            </div>
            <div className="filter-button" onClick={this.toggleFilter}>
              <h1 className="fs-12 c-blue fw-bold">Filter <i className="fas fa-arrow-up"></i></h1>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductNavMobile;
