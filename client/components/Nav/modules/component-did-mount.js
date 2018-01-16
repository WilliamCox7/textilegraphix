import { hashHistory } from '../../../packages';

export function componentDidMount(Nav) {
  var location = hashHistory.getCurrentLocation().pathname;
  location = location.split("/")[1];
  Nav.props.setLocation(location);
  window.addEventListener("click", (e) => {
    if (e.target.className !== 'search-bar' && e.target.className !== 'search-button') {
      Nav.setState({searchActive: false});
    }
    if (e.target.className === 'submit') {
      Nav.closeQuoteBox();
    }
  });
}
