import { React, Component, connect } from '../../packages';
import { Summary } from '../components';
import { setLocation } from '../../reducers/nav';
import { blueArrow } from '../../assets';
import './QuoteBox.scss';

class QuoteBox extends Component {

  constructor() {
    super();
    this.setLocation = this.setLocation.bind(this);
  }

  setLocation() {
    this.props.setLocation('submit');
  }

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
        <a className="submit" href="/#/submit" onClick={this.setLocation}>
          Submit Quote <img src={blueArrow} />
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(QuoteBox);
