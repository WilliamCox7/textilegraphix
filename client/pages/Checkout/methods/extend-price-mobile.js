export default function extendPrice(i) {
  if (this.state.extended[i]) {
    document.getElementById(`price-box-wrapper-mobile-${i}`).style.height = '36px';
    document.getElementById(`blue-arrow-mobile-${i}`).style.background = '#44B1DE';
    document.getElementById(`blue-arrow-label-${i}`).style.display = 'block';
  } else {
    document.getElementById(`price-box-wrapper-mobile-${i}`).style.height = '65px';
    document.getElementById(`blue-arrow-mobile-${i}`).style.background = 'none';
    document.getElementById(`blue-arrow-label-${i}`).style.display = 'none';
  }
  let newState = Object.assign({}, this.state);
  newState.extended[i] = !this.state.extended[i];
  this.setState(newState);
}
