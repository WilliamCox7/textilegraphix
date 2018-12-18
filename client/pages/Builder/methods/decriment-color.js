export default function decrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  newState[prop] = newState[prop] - 1;
  if (newState[prop] < 0) {
    newState[prop] = 0;
  }
  this.setState(newState, () => {
    let groundRate, shippingOffset = 0;
    if (this.state.rates.length) {
      groundRate = this.state.rates.find((rate) => rate.carrier === 'UPS' && rate.service === 'Ground').rate;
      shippingOffset = Number(groundRate) / this.state.quantity;
    }
    this.calculateCost(this.state, shippingOffset);
  });
}
