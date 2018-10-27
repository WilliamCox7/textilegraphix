import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';
import { clearCart } from '../../reducers/cart';
import { getAsset, toggle, sendConfirmation } from '../../modules';
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
      ccv: '',
      taxExempt: false
    }
    this.update = this.update.bind(this);
    this.toggle = this.toggle.bind(this);
    this.sendConfirmation = this.sendConfirmation.bind(this);
    this.authorizeCreditCard = this.authorizeCreditCard.bind(this);
  }

  render() {

    let total = this.props.total;
    let tax = total * (this.state.taxExempt ? 0 : 0.06);

    let details = this.props.orders.map((order, i) => {
      order.taxExempt = this.state.taxExempt;
      return (
        <div className="detail" key={i}>
          <MediaQuery minWidth={580}>
            <div className="deets-wrapper">
              <div className="flex ai-c">
                <h5>{order.product.brand} {order.product.number}</h5>
                <span className="dash">-</span><h6>{order.selectedColor}</h6>
              </div>
              <h7>
                <NumberFormat value={order.total} displayType={'text'}
                  thousandSeparator={true} prefix={'$'} decimalScale={2} />
              </h7>
            </div>
          </MediaQuery>
          <MediaQuery maxWidth={579}>
            <div className="deets-wrapper">
              <div className="flex ai-c jc-sb">
                <div className="flex fd-c">
                  <h5>{order.product.brand} {order.product.number} -</h5>
                  <h6>{order.selectedColor}</h6>
                </div>
                <h3>
                  <NumberFormat value={order.total} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h3>
              </div>
            </div>
          </MediaQuery>
        </div>
      );
    });

    return (
      <div className="Processor">
        <div className="processor-wrapper">
          <div className="close">
            <img src={getAsset('close-x-blue')} onClick={() => this.props.toggle('paymentModal')} />
          </div>
          <MediaQuery minWidth={1200}>
            <div className="message">{/*Order Succesfully Submitted!*/}</div>
          </MediaQuery>
          <div className="flex">
            <div className="side left">
              <MediaQuery minWidth={580}>
                <div className="info-wrapper">
                  <h1>TOTAL</h1>
                  <h2>
                    <NumberFormat value={total + tax} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  </h2>
                  <h1>DETAILS</h1>
                  <div className="detail-container">
                    {details}
                  </div>
                  <hr />
                  <div className="tax-amount flex">
                    <h3>TAX</h3>
                    <h4>
                      <NumberFormat value={tax} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} />
                    </h4>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={579}>
                <div className="info-wrapper-mobile">
                  <h4>DETAILS</h4>
                  <hr />
                  <div className="detail-container">
                    {details}
                  </div>
                  <div className="tax-amount flex jc-sb">
                    <div className="flex ai-c">
                      <h6>TAX</h6>
                      <span className="tax-exempt flex ai-c" onClick={() => this.toggle('taxExempt')}>
                        <img src={getAsset(this.state.taxExempt ? 'radio-filled' : 'radio-empty')} />
                        <label>Tax Exempt</label>
                      </span>
                    </div>
                    <h3>
                      <NumberFormat value={tax} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} />
                    </h3>
                  </div>
                  <hr />
                  <div className="flex jc-sb">
                    <h4>TOTAL</h4>
                    <h2>
                      <NumberFormat value={total + tax} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} />
                    </h2>
                  </div>
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={1199}>
                <CreditCard first={this.props.first} last={this.props.last} update={this.update} form={this.state} />
              </MediaQuery>
              <div className="pay-now flex jc-fe">
                <MediaQuery maxWidth={1199}>
                  <span></span>
                </MediaQuery>
                <button onClick={this.authorizeCreditCard}>PAY NOW</button>
                <span className="auth-image">
                  <img src={getAsset('auth', 'png')} />
                </span>
              </div>
            </div>
            <MediaQuery minWidth={1200}>
              <div className="side right">
                <CreditCard first={this.props.first} last={this.props.last} update={this.update} form={this.state} />
              </div>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={1200}>
            <img className="logo" src={getAsset('logo-gray')} />
          </MediaQuery>
        </div>
        <div className="gray-overlay" onClick={() => this.props.toggle('paymentModal')}></div>
      </div>
    );
  }
}

Processor.prototype.update = method.update;
Processor.prototype.toggle = toggle;
Processor.prototype.sendConfirmation = sendConfirmation;
Processor.prototype.authorizeCreditCard = method.authorizeCreditCard;

const mapDispatchToProps = {
  clearCart: clearCart
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Processor));
