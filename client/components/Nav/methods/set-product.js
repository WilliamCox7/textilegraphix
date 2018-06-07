export default function setProduct(product) {
  this.setState({product: product});
  this.toggleBuilder();
}
