export default function startDrag(e) {
  let clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
  let parent = e.target.tagName === 'I' ? e.target.parentElement.parentElement : e.target.parentElement;
  this.setState({dragging: true, mousePos: clientY, width: parent.clientWidth});
  this.props.toggle('dragging');
}
