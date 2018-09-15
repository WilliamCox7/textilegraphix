export default function removeOrder(guid) {
  if (this.state.selected !== 0) {
    this.selectOrder(0);
  }
  this.props.removeOrder(guid);
}
