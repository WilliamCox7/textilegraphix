export default function stopDrag(e, index, side) {
  let element = e.target.parentElement;
  this.setState({
    dragging: false, mousePos: undefined, width: undefined
  }, () => {
    this.props.saveEdits(element, index, side);
  });
}
