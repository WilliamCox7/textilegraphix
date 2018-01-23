export function componentDidMount(PrintArea) {
  var area = document.getElementsByClassName(
    !PrintArea.props.edit ? "PrintArea" : "PrintAreaHover")[PrintArea.props.nav.mockupnav.index];
  var areaSpecs = area.getBoundingClientRect();
  console.log(areaSpecs);
  var edge = areaSpecs.right+1;
  var vertCenter = areaSpecs.left + (areaSpecs.width / 2);
  var horCenter = areaSpecs.top + (areaSpecs.height / 2);
  var defaultX = areaSpecs.left;
  var defaultY = areaSpecs.top;
  PrintArea.setState({edge: edge, vertCenter: vertCenter, horCenter: horCenter, defaultX: defaultX, defaultY: defaultY});
}
