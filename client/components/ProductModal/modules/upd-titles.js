export function updTitles(title) {
  var newState = Object.assign({}, this.state);
  var adding = true, changed;
  newState.titles.forEach((view) => {
    if (view.text === title) {
      if (view.display) {
        adding = false;
      } else {
        changed = view.text;
      }
      view.display = !view.display;
    }
  });
  this.setState(newState, () => {
    this.props.toggleLoc(title);
    this.props.setTitles(this.state.titles, adding, changed);
  })
}
