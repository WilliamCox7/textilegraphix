export default function toggle(prop, prop2) {
  let newState = Object.assign({}, this.state);
  newState[prop] = !newState[prop];
  if (prop2) {
    newState[prop2] = !newState[prop2];
  }
  this.setState(newState);
}
