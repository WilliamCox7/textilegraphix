export function startDrag(e) {
  this.setState({dragging: true, mousePos: e.clientY, width: e.target.parentElement.clientWidth});
}
