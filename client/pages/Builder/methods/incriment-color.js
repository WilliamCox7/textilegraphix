export default function incrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  if (newState[prop] < 6) {
    newState[prop] = newState[prop] + 1;
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
