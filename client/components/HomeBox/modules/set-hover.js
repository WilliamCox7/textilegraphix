// there are two links rendered in this component, this is used to set the state of the link to "hover"
// this is done instead of css because the link contains an svg which cannot be easily manipulated in React

export function setHover(type) {
  var key = "hover" + type;
  var newState = Object.assign({}, this.state);
  newState[key] = !this.state[key];
  this.setState(newState);
}
