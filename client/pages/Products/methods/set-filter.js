export default function setFilter(filter) {
  var newState = Object.assign({}, this.state);
  newState.filter = filter;
  this.setState(newState);
}
