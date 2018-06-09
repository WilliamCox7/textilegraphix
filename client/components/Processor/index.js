import { React, Component, NumberFormat } from '../../packages';
import { getAsset } from '../../modules';
import './style.scss';

import CreditCard from './CreditCard';
import * as method from './methods';

class Processor extends Component {

  constructor() {
    super();
    this.state = {
      number: '',
      expMonth: '',
      expYear: '',
      ccv: ''
    }
    this.update = this.update.bind(this);
  }

  render() {

    let total = this.props.total;
    let tax = this.props.exempt ? 0 : total * 0.06;

    let details = this.props.orders.map((order, i) => {
      return (
        <div className="detail" key={i}>
          <div className="flex ai-c">
            <h1 className="fs-14 c-black-2 fw-bold">{order.product.brand} {order.product.number}</h1>
            <span className="dash">-</span><h1 className="fs-14 c-gray-3">{order.selectedColor}</h1>
          </div>
          <h1 className="fs-14 c-blue">
            <NumberFormat value={order.total} displayType={'text'}
              thousandSeparator={true} prefix={'$'} decimalScale={2} />
          </h1>
        </div>
      );
    });

    return (
      <div className="Processor">
        <div className="processor-wrapper">
          <div className="close"><img src={getAsset('close-x-blue')} onClick={() => this.props.toggle('paymentModal')} /></div>
          <div className="message fs-26 c-green">Order Succesfully Submitted!</div>
          <div className="flex">
            <div className="side left">
              <h1 className="fs-30 c-black-2">TOTAL</h1>
              <h1 className="fs-36 c-blue fw-bold">
                <NumberFormat value={total + tax} displayType={'text'}
                  thousandSeparator={true} prefix={'$'} decimalScale={2} />
              </h1>
              <h1 className="fs-30 c-black-2">DETAILS</h1>
              <div className="detail-container">
                {details}
              </div>
              <hr />
              <div className="tax-amount flex">
                <h1 className="fs-18 c-black-2">TAX</h1>
                <h1 className="fs-18 c-blue">
                  <NumberFormat value={tax} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h1>
              </div>
              <div className="pay-now flex jc-fe">
                <button className="fs-24 c-blue fw-bold">PAY NOW</button>
                <img src={getAsset('auth', 'png')} />
              </div>
            </div>
            <div className="side right">
              <CreditCard first={this.props.first} last={this.props.last} update={this.update} form={this.state} />
            </div>
          </div>
          <img className="logo" src={getAsset('logo-gray')} />
        </div>
        <div className="gray-overlay" onClick={() => this.props.toggle('paymentModal')}></div>
      </div>
    );
  }
}

Processor.prototype.update = method.update;

export default Processor;
