export function update(e) {
  var newState = Object.assign({}, this.state);
  newState[e.target.name] = e.target.value;
  this.setState(newState);
}
