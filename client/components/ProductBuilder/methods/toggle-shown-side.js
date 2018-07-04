export default function toggleShownSide() {
  let side = this.state.shownSide ? 0 : 1;
  this.setState({shownSide: side});
}
