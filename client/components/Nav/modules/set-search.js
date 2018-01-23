export function setSearch(e) {
  this.setState({searchActive: !this.state.searchActive});
  e.currentTarget.parentElement.children[1].children[0].focus();
  this.closeQuoteBox();
}
