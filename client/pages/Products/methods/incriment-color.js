export default function incrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  if (newState.productBuilderInit[prop] < 6) {
    newState.productBuilderInit[prop] = newState.productBuilderInit[prop] + 1;
  }
  this.setState(newState);
}
