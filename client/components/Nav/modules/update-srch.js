export function updateSrch(e) {
  this.setState({searchTxt: e.target.value});
  this.closeQuoteBox();
}
