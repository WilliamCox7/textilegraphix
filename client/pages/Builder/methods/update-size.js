export default function updateSize(e) {
  if (!isNaN(e.target.value)) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = Number(e.target.value);
    newState.quantity = 0;
    if (newState.XS) newState.quantity += newState.XS;
    if (newState.S) newState.quantity += newState.S;
    if (newState.M) newState.quantity += newState.M;
    if (newState.L) newState.quantity += newState.L;
    if (newState.XL) newState.quantity += newState.XL;
    if (newState.XL2) newState.quantity += newState.XL2;
    if (newState.XL3) newState.quantity += newState.XL3;
    if (newState.XL4) newState.quantity += newState.XL4;
    if (newState.XL5) newState.quantity += newState.XL5;
    this.setState(newState, this.calculateCost)
  }
}
