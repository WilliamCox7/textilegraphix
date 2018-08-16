export default function incrimentColor(color) {
  let prop = color + "Colors";
  let newState = Object.assign({}, this.state);
  if (newState[prop] < 6) {
    newState[prop] = newState[prop] + 1;
  }
  this.setState(newState, () => {
    this.calculateCost();
  });
}
