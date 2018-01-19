import { selectProduct } from './select-product';
import { setLocation } from '../../_shared_modules';

export function construct(SearchResults) {
  SearchResults.selectProduct = selectProduct.bind(SearchResults);
  SearchResults.setLocation = setLocation.bind(SearchResults);
}
