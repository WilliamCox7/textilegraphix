export function drag(e) {
  if (this.state.dragging) {
    var newWidth = this.state.width - (this.state.mousePos - e.clientY);
    if (newWidth < 200 && e.target.getBoundingClientRect().right <= this.state.edge) {
      e.target.parentElement.style.width = newWidth + 'px';
    }
  }
  e.preventDefault();
  return false;
}
