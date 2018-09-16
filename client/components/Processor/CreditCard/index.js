import React, { Component } from 'react';
import { getAsset } from '../../../modules';
import './style.scss';

class CreditCard extends Component {
  render() {

    let cardType;
    if (this.props.form.number[0] === '4') cardType = getAsset('visa', 'png');
    if (this.props.form.number[0] === '5') cardType = getAsset('mastercard', 'png');
    if (this.props.form.number[0] === '3') cardType = getAsset('express', 'png');
    if (this.props.form.number[0] === '6') cardType = getAsset('discover', 'png');

    return (
      <div className="CreditCard">
        <img className="card-type" src={cardType} />
        <h1>{this.props.first || 'Mack'} {this.props.last || 'Wible'}</h1>
        <h2>Credit Card Number</h2>
        <input className="card-input" type="text" placeholder="xxxx  xxxx  xxxx  xxxx"
          name="number" onChange={this.props.update} value={this.props.form.number} maxLength="22" />
        <div className="flex">
          <div className="expiration">
            <h2 className="fs-18 c-white">Expiration</h2>
            <div className="flex">
              <input type="text" placeholder="January" name="expMonth"
                onChange={this.props.update} value={this.props.form.expMonth} />
              <input type="text" placeholder="2020" maxLength="4" name="expYear"
                onChange={this.props.update} value={this.props.form.expYear} />
            </div>
          </div>
          <div className="ccv">
            <h2>CCV</h2>
            <input type="text" placeholder="xxx"
              name="ccv" onChange={this.props.update} value={this.props.form.ccv} maxLength="3" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreditCard;
