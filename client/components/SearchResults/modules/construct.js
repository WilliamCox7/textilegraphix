import { selectProduct } from './select-product';

export function construct(SearchResults) {
  SearchResults.selectProduct = selectProduct.bind(SearchResults);
}
