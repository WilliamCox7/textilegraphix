export default function uploadImage(image) {
  let side = this.state.shownSide ? 'back' : 'front';
  let newState = Object.assign({}, this.state);
  newState.uploaded[side].push(image);
  this.setState(newState);
}
