import { showQuoteBox } from './show-quote-box';
import { closeQuoteBox } from './close-quote-box';
import { setLocation } from '../../_shared_modules';
import { setSearch } from './set-search';
import { updateSrch } from './update-srch';
import { resetSearchText } from './reset-search-text';

export function construct(Nav) {

  Nav.state = {
    width: document.body.clientWidth,
    showQuoteBox: false,
    searchActive: false,
    searchTxt: ''
  }

  Nav.showQuoteBox = showQuoteBox.bind(Nav);
  Nav.closeQuoteBox = closeQuoteBox.bind(Nav);
  Nav.setLocation = setLocation.bind(Nav);
  Nav.setSearch = setSearch.bind(Nav);
  Nav.updateSrch = updateSrch.bind(Nav);
  Nav.resetSearchText = resetSearchText.bind(Nav);

}
