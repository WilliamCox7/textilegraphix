export default function incrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  newState[prop] = newState[prop] + 1;
  if (newState[prop] > 6) {
    newState[prop] = 6;
  }
  this.setState(newState, () => {
    this.calculateCost(this.state);
  });
}
