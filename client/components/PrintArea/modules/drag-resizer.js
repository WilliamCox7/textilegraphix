export function dragResizer(e, id) {
  if (this.state.dragging) {
    var newWidth = this.state.width - (this.state.mousePos - e.clientY);
    if (newWidth < 200 && e.target.getBoundingClientRect().right <= this.state.edge && newWidth > 0) {
      e.target.parentElement.style.width = newWidth + 'px';
      this.props.saveWidth(id, this.props.nav.mockupnav.index, newWidth);
    }
  }
  e.preventDefault();
  return false;
}
