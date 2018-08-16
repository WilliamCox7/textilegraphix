export default function selectColor(color) {
  this.setState({selectedColor: color.name, selectedHex: color.hex});
}
