import { React, Component, connect } from '../../packages';
import { setModal } from '../../reducers/modal';
import { setProduct, resetModal, resetMockupNav } from '../../reducers/product';
import './Product.scss';

class Product extends Component {

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
  }

  openModal(product) {
    product.guid = guid();
    this.props.setModal(true);
    this.props.setProduct(product);
    this.props.resetMockupNav();
    this.props.resetModal();
  }

  render() {
    return (
      <div className="Product" onClick={() => this.openModal(this.props.product)}>
        <div className="image-container">
          <img src={this.props.product.image} />
          <span>Build Product</span>
        </div>
        <h1>{this.props.product.brand.toUpperCase()}</h1>
        <h1>{this.props.product.number}</h1>
      </div>
    );
  }
}

const mapDispatchToProps = {
  setModal: setModal,
  setProduct: setProduct,
  resetMockupNav: resetMockupNav,
  resetModal: resetModal
}

export default connect(null, mapDispatchToProps)(Product);

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4();
}
