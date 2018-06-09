export default function saveEdits(element, index, side) {
  let width = element.style.width;
  let newState = Object.assign({}, this.state);
  newState.uploaded[side][index].width = width;
  newState.uploaded[side][index].position = getXandY(element);
  this.setState(newState);
}

function getXandY(element) {
  var style = window.getComputedStyle(element);
  var matrix = new WebKitCSSMatrix(style.webkitTransform);
  return {x: matrix.m41, y: matrix.m42};
}
