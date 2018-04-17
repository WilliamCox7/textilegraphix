import { React, Component } from '../../packages';
import { radioFilled, radioEmpty, hoodieThumb, longSleeveThumb, tShirtThumb } from '../../assets';
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
          <h1>Select a Shirt</h1>
          {!this.props.showFilter ? (
            <h1 onClick={this.toggleFilter} className="blue-text">
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
                <h1 className="blue-text">T-Shirts</h1>
              </span>
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('long sleeve shirt')}
                style={this.props.filter === 'long sleeve shirt' ? active : null}>
                <img src={longSleeveThumb} />
                <h1 className="blue-text">Long Sleeves</h1>
              </span>
              <span className="flex ai-c jc-fe fd-c" onClick={() => this.setFilter('hoodies')}
                style={this.props.filter === 'hoodies' ? active : null}>
                <img src={hoodieThumb} />
                <h1 className="blue-text">Hoodies</h1>
              </span>
            </div>
            <div className="filter-button" onClick={this.toggleFilter}>
              <h1 className="blue-text">Filter <i className="fas fa-arrow-up"></i></h1>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default ProductNavMobile;
