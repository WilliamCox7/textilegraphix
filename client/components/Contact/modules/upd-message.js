export function updMessage(e) {
  var newState = Object.assign({}, this.state);
  newState.email.message = e.target.value;
  this.setState(newState);
}
