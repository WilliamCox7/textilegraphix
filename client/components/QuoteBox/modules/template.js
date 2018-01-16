import { React } from '../../../packages';
import { Summary } from '../../index';
import { blueArrow } from '../../../assets';

export function template(QuoteBox) {
  var quotes = QuoteBox.props.cart.products.map((product, i) => {
    return <Summary summary={product} key={i} />;
  });

  return (
    <div className="QuoteBox">
      {quotes}
      <div className="totals">
        <span>
          <h1>Estimated Subtotal:</h1>
          <h1>
            ${QuoteBox.props.cart.subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
          </h1>
        </span>
      </div>
      <a className="submit" href="/#/submit" onClick={QuoteBox.setLocation}>
        Submit Quote <img src={blueArrow} />
      </a>
    </div>
  );
}
