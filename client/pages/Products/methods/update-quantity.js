export default function updateQuantity(e) {
  if (!isNaN(e.target.value)) {
    let newState = Object.assign({}, this.state);
    newState.productBuilderInit.quantity = Number(e.target.value);
    this.setState(newState);
  }
}
