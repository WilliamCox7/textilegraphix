export default function updateQuantity(e) {
  if (!isNaN(e.target.value)) {
    this.setState({quantity: Number(e.target.value) || 1}, () => {
      let groundRate, shippingOffset = 0;
      if (this.state.rates.length) {
        groundRate = this.state.rates.find((rate) => rate.carrier === 'UPS' && rate.service === 'Ground').rate;
        shippingOffset = Number(groundRate) / this.state.quantity;
      }
      this.calculateCost(this.state, shippingOffset);
      if (!this.state.showZip) this.getRates();
    });
  }
}
