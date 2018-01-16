export function componentDidMount(PrintArea) {
  var area = document.getElementsByClassName(
    !PrintArea.props.edit ? "PrintArea" : "PrintAreaHover")[0];
  var areaSpecs = area.getBoundingClientRect();
  var edge = areaSpecs.right+1;
  var vertCenter = areaSpecs.left + (areaSpecs.width / 2);
  var horCenter = areaSpecs.top + (areaSpecs.height / 2);
  PrintArea.setState({edge: edge, vertCenter: vertCenter, horCenter: horCenter});
}
