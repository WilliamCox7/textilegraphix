export function setHover(type) {
  var key = "hover" + type;
  var newState = Object.assign({}, this.state);
  newState[key] = !this.state[key];
  this.setState(newState);
}
