import { React } from '../../../packages';

export function template(SearchResults) {
  var count = 0, results = [];
  SearchResults.props.shop.products.forEach((product, i) => {
    if (JSON.stringify(product).indexOf(SearchResults.props.searchTxt) > -1 && count < 7) {
      count++;
      results.push(
        <a href="/#/shop" className="result" key={i} onClick={() => {
          SearchResults.selectProduct(product); SearchResults.setLocation('shop');}}>
          <img src={product.image} />
          <span>
            {product.brand}
          </span>
          <span>
            {product.number}
          </span>
        </a>
      );
    }
  });

  return (
    <div className="SearchResults">
      {results.length > 0 ? results : (
        <div className="error">no results for "{SearchResults.props.searchTxt}"</div>)}
    </div>
  );
}
