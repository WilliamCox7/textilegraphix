export default function fadeHelp() {
  let self = this;
  let helpHover = document.getElementById('help-hover');
  if (helpHover) {
    self.opacityTimer = setTimeout(() => {
      helpHover.style.opacity = 0;
    }, 500);
    self.showHelpTimer = setTimeout(() => {
      helpHover.style.opacity = 1;
      self.setState({help: false});
    }, 1500);
  }
}
