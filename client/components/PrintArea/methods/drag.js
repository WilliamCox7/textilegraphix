export default function drag(e) {
  let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
  let parent = e.target.tagName === 'I' ? e.target.parentElement.parentElement : e.target.parentElement;
  if (this.state.dragging) {
    var newWidth = this.state.width - (this.state.mousePos - clientY);
    if (newWidth < 254 && parent.getBoundingClientRect().right <= this.state.edge) {
      parent.style.width = newWidth + 'px';
    }
  }
  e.preventDefault();
  return false;
}
