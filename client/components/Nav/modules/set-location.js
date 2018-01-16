export function setLocation(e) {
  var location = e.target.innerText.toLowerCase();
  this.props.setLocation(location);
}
