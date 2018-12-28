export default function validateQuantity(e) {
  if (Number(e.target.value) < 30) {
    let newState = Object.assign({}, this.state);
    newState.productBuilderInit.quantity = 30;
    this.setState(newState);
    document.getElementById('qty-input').children[1].value = 30;
  }
}
