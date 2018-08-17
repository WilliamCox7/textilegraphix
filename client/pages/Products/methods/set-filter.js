export default function setFilter(filter) {
  var newState = Object.assign({}, this.state);
  if (newState.filter === filter) {
    newState.filter = '';
  } else {
    newState.filter = filter;
  }
  this.setState(newState);
}
