export default function cancelHelpTimer() {
  let helpHover = document.getElementById('help-hover');
  if (this.opacityTimer) {
    clearTimeout(this.opacityTimer);
    this.opacityTimer = null;
  }
  if (this.showHelpTimer) {
    clearTimeout(this.showHelpTimer);
    this.showHelpTimer = null;
  }
  if (helpHover) {
    helpHover.style.opacity = 1;
  }
}
