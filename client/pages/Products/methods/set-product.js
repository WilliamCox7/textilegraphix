export default function setProduct(product) {
  this.updateCost(product);
  this.setState({product: product}, () => this.toggleBuilder());
}
