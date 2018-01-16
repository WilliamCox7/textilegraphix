export function addToCart() {
  this.props.add(this.props.product);
  this.props.setModal(false);
}
