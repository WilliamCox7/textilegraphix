export default function extendPrice(i) {
  if (this.state.extended[i]) {
    document.getElementById(`price-box-wrapper-${i}`).style.maxWidth = '166px';
    document.getElementById(`blue-arrow-${i}`).style.left = '2px';
    document.getElementById(`price-typical-${i}`).style.minWidth = '166px';
  } else {
    document.getElementById(`price-box-wrapper-${i}`).style.maxWidth = '280px';
    document.getElementById(`blue-arrow-${i}`).style.left = '9px';
    document.getElementById(`price-typical-${i}`).style.minWidth = '115px';
  }
  let newState = Object.assign({}, this.state);
  newState.extended[i] = !this.state.extended[i];
  this.setState(newState);
}
