export function updFrom(e) {
  var newState = Object.assign({}, this.state);
  newState.email.from = e.target.value;
  this.setState(newState);
}
