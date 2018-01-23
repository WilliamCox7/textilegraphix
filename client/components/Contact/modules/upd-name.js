export function updName(e) {
  var newState = Object.assign({}, this.state);
  newState.email.name = e.target.value;
  this.setState(newState);
}
