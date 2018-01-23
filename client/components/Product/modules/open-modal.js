export function openModal(product) {
  this.props.setModal(true);
  this.props.setProduct(product);
}
