export default function updateInput(e) {
  let newState = Object.assign({}, this.state);
  newState[e.target.name] = e.target.value;
  this.setState(newState);
}
