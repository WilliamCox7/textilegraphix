export default function toggleSearchInput() {
  this.setState({searchActive: !this.state.searchActive}, () => {
    if (this.state.searchActive) {
      document.getElementsByClassName('search-input')[0].focus();
    }
  });
}
