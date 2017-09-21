import React, { Component } from 'react';
import { connect } from 'react-redux';
import Summary from '../Summary/Summary';
import './QuoteBox.scss';

class QuoteBox extends Component {
  render() {

    var quotes = this.props.cart.products.map((product, i) => {
      return <Summary summary={product} key={i} />;
    });

    return (
      <div className="QuoteBox">
        {quotes}
        <div className="totals">
          <span>
            <h1>Estimated Subtotal:</h1>
            <h1>
              ${this.props.cart.subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}
            </h1>
          </span>
        </div>
        <a className="submit" href="/#/submit">Submit Quote</a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(QuoteBox);
