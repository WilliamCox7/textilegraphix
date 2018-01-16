export function componentDidMount(ProductModal) {
  ProductModal.props.setColor(ProductModal.props.product.colors[0]);
  ProductModal.setDelivery();
}
