<<<<<<< HEAD
import { Component, connect } from '../../packages';
import { template, mapStateToProps, mapDispatchToProps, construct } from './modules';
=======
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModal } from '../../reducers/modal';
import { setProduct } from '../../reducers/product';
>>>>>>> parent of aef9be6... fixed search links
import './SearchResults.scss';

class SearchResults extends Component {

  constructor() {
    super();
    construct(this);
  }

  render() {
<<<<<<< HEAD
    return template(this);
=======

    var count = 0, results = [];
    this.props.shop.products.forEach((product, i) => {
      if (JSON.stringify(product).indexOf(this.props.searchTxt) > -1 && count < 7) {
        count++;
        results.push(
          <div className="result" key={i} onClick={() => this.selectProduct(product)}>
            <img src={product.image} />
            <span>
              {product.brand}
            </span>
            <span>
              {product.number}
            </span>
          </div>
        );
      }
    });

    return (
      <div className="SearchResults">
        {results.length > 0 ? results : (
          <div className="error">no results for "{this.props.searchTxt}"</div>)}
      </div>
    );
>>>>>>> parent of aef9be6... fixed search links
  }

<<<<<<< HEAD
=======
const mapDispatchToProps = {
  setModal: setModal,
  setProduct: setProduct
>>>>>>> parent of aef9be6... fixed search links
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
