export default function toggle(prop) {
  console.log(prop);
  let newState = Object.assign({}, this.state);
  newState[prop] = !newState[prop];
  this.setState(newState);
}
