export default function uploadImage(image) {
  let side = this.state.shownSide ? 'back' : 'front';
  let newState = Object.assign({}, this.state);
  let index = newState.uploaded[side].length;
  image.index = index;
  newState.uploaded[side].push(image);
  this.setState(newState);
}
