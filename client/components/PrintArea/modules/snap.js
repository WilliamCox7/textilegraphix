export function snap(e) {
  if (this.props.edit) {
    var guides = document.getElementsByClassName('guides')[0];
    var imageSpecs = e.target.getBoundingClientRect();
    var vertCenter = imageSpecs.left + (imageSpecs.width / 2);
    var horCenter = imageSpecs.top + (imageSpecs.height / 2);
    if (Math.abs(this.state.vertCenter - vertCenter) <= 1) {
      guides.children[0].style.borderRightColor = '#44B1DE';
      guides.children[1].style.borderLeftColor = '#44B1DE';
      guides.children[2].style.borderRightColor = '#44B1DE';
      guides.children[3].style.borderLeftColor = '#44B1DE';
    } else {
      guides.children[0].style.borderRightColor = '#939598';
      guides.children[1].style.borderLeftColor = '#939598';
      guides.children[2].style.borderRightColor = '#939598';
      guides.children[3].style.borderLeftColor = '#939598';
    }
    if (Math.abs(this.state.horCenter - horCenter) <= 1) {
      guides.children[0].style.borderBottomColor = '#44B1DE';
      guides.children[1].style.borderBottomColor = '#44B1DE';
      guides.children[2].style.borderTopColor = '#44B1DE';
      guides.children[3].style.borderTopColor = '#44B1DE';
    } else {
      guides.children[0].style.borderBottomColor = '#939598';
      guides.children[1].style.borderBottomColor = '#939598';
      guides.children[2].style.borderTopColor = '#939598';
      guides.children[3].style.borderTopColor = '#939598';
    }
  }
}
