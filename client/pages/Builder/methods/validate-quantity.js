export default function validateQuantity(e) {
  if (Number(e.target.value) < 30) {
    let newState = Object.assign({}, this.state);
    newState.quantity = 30;
    this.setState(newState);
    document.getElementById('qty-input').value = 30;
  }
}
