export default function onStopMove(e, index, side) {
  let element = e.target.parentElement.parentElement;
  this.props.saveEdits(element, index, side);
  this.props.toggle('dragging');
}
