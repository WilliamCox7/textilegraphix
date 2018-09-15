export default function toggleSameAsBilling() {
  let newState = Object.assign({}, this.state);
  newState.shipping.sameAsBilling = !newState.shipping.sameAsBilling;
  if (newState.shipping.sameAsBilling) {
    newState.shipping = Object.assign({}, newState.billing);
    newState.shipping.sameAsBilling = true;
  }
  this.setState(newState);
}
