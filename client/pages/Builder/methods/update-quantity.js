export default function updateQuantity(e) {
  if (!isNaN(e.target.value)) {
    this.setState({quantity: Number(e.target.value)}, () => {
      this.calculateCost(this.state, this.state.shippingOffset);
      if (!this.state.showZip) this.getRates();
    });
  }
}
