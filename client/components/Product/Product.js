import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModal } from '../../reducers/modal';
import { setProduct } from '../../reducers/product';
import './Product.scss';

class Product extends Component {

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
  }

  openModal(product) {
    this.props.setModal(true);
    this.props.setProduct(product);
  }

  render() {
    return (
      <div className="Product">
        <div className="image-container">
          <img src={this.props.product.image} />
          <button onClick={() => this.openModal(this.props.product)}>
            Build Product
          </button>
        </div>
        <h1>{this.props.product.brand.toUpperCase()}</h1>
        <h1>{this.props.product.number}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setModal: setModal,
  setProduct: setProduct
}

export default connect(null, mapDispatchToProps)(Product);
