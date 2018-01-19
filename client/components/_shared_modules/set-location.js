// this function stores the current route location (used for highlighting the current page link in nav)

export function setLocation(loc) {
  var location = loc;
  this.props.setLocation(location);
}
