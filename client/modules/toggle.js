export default function toggle(prop) {
  let newState = Object.assign({}, this.state);
  newState[prop] = !newState[prop];
  this.setState(newState);
}
