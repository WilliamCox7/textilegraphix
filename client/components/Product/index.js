import { React, Component } from '../../packages';
import './style.scss';

class Product extends Component {
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

export default Product;
