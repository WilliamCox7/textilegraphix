export default function setProduct(order) {
  order.edit = true;
  this.props.initializeBuilder(order);
  this.props.history.push('/builder');
}
