export default function updateInput(e, form) {
  let newState = Object.assign({}, this.state);
  newState[form][e.target.name] = e.target.value;
  this.setState(newState);
}
