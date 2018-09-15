import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';
import { clearCart } from '../../reducers/cart';
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
    this.authorizeCreditCard = this.authorizeCreditCard.bind(this);
  }

  render() {

    let total = this.props.total;
    let tax = total * 0.06;

    let details = this.props.orders.map((order, i) => {
      return (
        <div className="detail" key={i}>
          <div className="flex ai-c">
            <h5>{order.product.brand} {order.product.number}</h5>
            <span className="dash">-</span><h6>{order.selectedColor}</h6>
          </div>
          <h7>
            <NumberFormat value={order.total} displayType={'text'}
              thousandSeparator={true} prefix={'$'} decimalScale={2} />
          </h7>
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
            <div className="message">Order Succesfully Submitted!</div>
          </MediaQuery>
          <div className="flex">
            <div className="side left">
              <h1>TOTAL</h1>
              <h2>
                <NumberFormat value={total + tax} displayType={'text'}
                  thousandSeparator={true} prefix={'$'} decimalScale={2} />
              </h2>
              <h1>DETAILS</h1>
              <div className="detail-container">
                {details}
              </div>
              <MediaQuery maxWidth={1200}>
                <div className="message">Order Succesfully Submitted!</div>
              </MediaQuery>
              <hr />
              <div className="tax-amount flex">
                <h3>TAX</h3>
                <h4>
                  <NumberFormat value={tax} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h4>
              </div>
              <div className="pay-now flex jc-fe">
                <MediaQuery maxWidth={1200}>
                  <span></span>
                </MediaQuery>
                <button onClick={this.authorizeCreditCard}>PAY NOW</button>
                <span className="auth-image">
                  <img src={getAsset('auth', 'png')} />
                </span>
              </div>
              <MediaQuery maxWidth={1200}>
                <CreditCard first={this.props.first} last={this.props.last} update={this.update} form={this.state} />
              </MediaQuery>
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
Processor.prototype.authorizeCreditCard = method.authorizeCreditCard;

const mapDispatchToProps = {
  clearCart: clearCart
}

export default withRouter(connect(null, mapDispatchToProps)(Processor));
