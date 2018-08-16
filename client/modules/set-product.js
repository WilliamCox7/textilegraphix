export default function setProduct(product) {
  this.props.initializeBuilder(this.state.productBuilderInit, product);
}
