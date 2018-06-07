export default function decrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  newState.productBuilderInit[prop] = newState.productBuilderInit[prop] - 1;
  if (newState[prop] < 0) {
    newState[prop] = 0;
  }
  this.setState(newState);
}
