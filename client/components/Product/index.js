import { React, Component } from '../../packages';
import './style.scss';

class Product extends Component {
  render() {
    return (
      <div className="Product" onClick={() => this.props.setProduct(this.props.product)}>
        <div className="image-container flex ai-c jc-c">
          <img src={this.props.product.thumbnail} />
          <h1 className="fs-11 c-white">Build Product</h1>
        </div>
        <h1 className="fs-11 c-gray-1">{this.props.product.brand.toUpperCase()}</h1>
        <h1 className="fs-11 c-gray-1">{this.props.product.number}</h1>
      </div>
    );
  }
}

export default Product;
