export function changeView(index, curIndex, length) {
  if (index >= 0 && index < length) {
    this.props.updateViewIndex(index);
    var viewContainer = document.getElementById("view-container");
    var marginLeft = viewContainer.style.marginLeft;
    var marginValue = Number(marginLeft.substring(0, marginLeft.length - 2));
    if (index < curIndex) {
      var newMargin = marginValue + 326;
      viewContainer.style.marginLeft = newMargin + "px";
    } else if (index > curIndex) {
      var newMargin = marginValue - 326;
      viewContainer.style.marginLeft = newMargin + "px";
    }
  }
}
