export function stopDrag(e) {
  this.setState({dragging: false, mousePos: undefined, width: undefined});
  var guides = document.getElementsByClassName('guides')[0];
  guides.children[0].style.borderRightColor = '#939598';
  guides.children[1].style.borderLeftColor = '#939598';
  guides.children[2].style.borderRightColor = '#939598';
  guides.children[3].style.borderLeftColor = '#939598';
  guides.children[0].style.borderBottomColor = '#939598';
  guides.children[1].style.borderBottomColor = '#939598';
  guides.children[2].style.borderTopColor = '#939598';
  guides.children[3].style.borderTopColor = '#939598';
}
