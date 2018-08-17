export default function setZip(e) {
  let newState = Object.assign({}, this.state);
  newState.zip = e.target.value;
  this.setState(newState);
}
