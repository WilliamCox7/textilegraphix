export default function setProduct(product) {
  let order = Object.assign({}, this.state.productBuilderInit);
  order.product = product;
  order.selectedHex = product.colors[0].hex;
  order.selectedColor = product.colors[0].name;
  this.props.initializeBuilder(order);
}
