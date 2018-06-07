export default function showHelp() {
  this.cancelHelpTimer();
  this.setState({help: true});
}
