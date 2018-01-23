export function updateSize(e, size) {
  if (!isNaN(e.target.value)) {
    var newState = Object.assign({}, this.state);
    newState[size] = e.target.value;
    this.setState(newState);
    this.props.updateSize(size, e.target.value);
  }
}
