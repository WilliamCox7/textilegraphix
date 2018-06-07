export default function setProduct(product) {
  this.updateCost(product);
  this.setState({product: product, builder: !this.state.builder, overlay: !this.state.overlay});
}
