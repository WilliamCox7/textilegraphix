export default function updateSize(e, form) {
  if (!isNaN(e.target.value)) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = Number(e.target.value);
    newState.quantity = 0;
    if (form.XS) newState.quantity += form.XS;
    if (form.S) newState.quantity += form.S;
    if (form.M) newState.quantity += form.M;
    if (form.L) newState.quantity += form.L;
    if (form.XL) newState.quantity += form.XL;
    if (form.XL2) newState.quantity += form.XL2;
    if (form.XL3) newState.quantity += form.XL3;
    if (form.XL4) newState.quantity += form.XL4;
    if (form.XL5) newState.quantity += form.XL5;
    this.setState(newState, this.calculateCost)
  }
}
