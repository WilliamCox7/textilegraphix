export default function toggleBuilder() {
  this.setState({builder: !this.state.builder});
  this.toggleOverlay();
}
