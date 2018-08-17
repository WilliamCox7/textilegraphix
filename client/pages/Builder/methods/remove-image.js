export default function removeImage(index) {
  let side = this.state.shownSide ? 'back' : 'front';
  let newState = Object.assign({}, this.state);
  newState.uploaded[side].splice(index, 1);
  this.setState(newState);
}
