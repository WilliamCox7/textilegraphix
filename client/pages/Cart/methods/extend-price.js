export default function extendPrice(i) {
  document.getElementById(`price-box-wrapper-${i}`).style.maxWidth = getMaxWidth(this.state.extended[i]);
  document.getElementById(`blue-arrow-${i}`).style.left = getLeft(this.state.extended[i]);
  document.getElementById(`price-typical-${i}`).style.minWidth = getMinWidth(this.state.extended[i]);
  let newState = Object.assign({}, this.state);
  newState.extended[i] = !this.state.extended[i];
  this.setState(newState);
}

function getMaxWidth(extended) {
  if (window.innerWidth >= 690) {
    return extended ? '166px' : '280px';
  } else {
    return extended ? '120px' : '220px';
  }
}

function getLeft(extended) {
  if (window.innerWidth >= 690) {
    return extended ? '2px' : '9px';
  } else {
    return extended ? '3px' : '9px';
  }
}

function getMinWidth(extended) {
  if (window.innerWidth >= 690) {
    return extended ? '166px' : '115px';
  } else {
    return extended ? '120px' : '74px';
  }
}
