export default function updateColor(color) {
  this.setState({selectedColor: color.name, selectedHex: color.hex}, () => {
    this.calculateCost(this.state);
  });
}
