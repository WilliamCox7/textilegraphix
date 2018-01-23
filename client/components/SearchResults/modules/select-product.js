export function selectProduct(product) {
  this.props.setModal(true);
  this.props.setProduct(product);
  this.props.resetSearchText();
}
