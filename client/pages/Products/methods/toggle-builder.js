export default function toggleBuilder() {
  this.setState({builder: !this.state.builder, overlay: !this.state.overlay});
}
