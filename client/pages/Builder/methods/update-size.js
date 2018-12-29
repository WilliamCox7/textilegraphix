export default function updateSize(e, form) {
  if (!isNaN(e.target.value)) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = Number(e.target.value);
    newState.quantity = 0;
    if (form.XS) newState.quantity += Number(form.XS);
    if (form.S) newState.quantity += Number(form.S);
    if (form.M) newState.quantity += Number(form.M);
    if (form.L) newState.quantity += Number(form.L);
    if (form.XL) newState.quantity += Number(form.XL);
    if (form.XL2) newState.quantity += Number(form.XL2);
    if (form.XL3) newState.quantity += Number(form.XL3);
    if (form.XL4) newState.quantity += Number(form.XL4);
    if (form.XL5) newState.quantity += Number(form.XL5);
    if (!newState.quantity) newState.quantity = 1;
    this.setState(newState, () => {
      let groundRate, shippingOffset = 0;
      if (this.state.rates.length) {
        groundRate = this.state.rates.find((rate) => rate.carrier === 'UPS' && rate.service === 'Ground').rate;
        shippingOffset = this.state.quantity ? Number(groundRate) / this.state.quantity : 0;
      }
      this.calculateCost(this.state, shippingOffset);
      if (!this.state.showZip) this.getRates();
      document.getElementById('qty-input').value = this.state.quantity;
    });
  }
}
