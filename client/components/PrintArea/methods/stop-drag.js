export default function stopDrag(e) {
  this.setState({dragging: false, mousePos: undefined, width: undefined});
}
