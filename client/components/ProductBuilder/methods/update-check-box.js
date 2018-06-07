export default function updateCheckBox(e) {
  let newState = Object.assign({}, this.state);
  newState[e.target.name] = !newState[e.target.name];
  this.setState(newState, () => {
    this.calculateCost(this.state);
  });
}
