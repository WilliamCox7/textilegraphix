export default function updateColor(color) {
  this.setState({selectedColor: color.name, selectedHex: color.hex}, () => {
    this.calculateCost(this.state);
    this.replaceImageWithBase64(this.props.builder.product.images[color.hex][0], color.hex, 0);
    this.replaceImageWithBase64(this.props.builder.product.images[color.hex][1], color.hex, 1);
  });
}
