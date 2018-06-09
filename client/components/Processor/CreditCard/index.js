import { React, Component } from '../../../packages';
import { getAsset } from '../../../modules';
import './style.scss';

class CreditCard extends Component {
  render() {
    return (
      <div className="CreditCard">
        <img className="visa" src={getAsset('visa')} />
        <h1 className="fs-30 c-white">{this.props.first || 'Mack'} {this.props.last || 'Wible'}</h1>
        <h1 className="fs-18 c-white">Credit Card Number</h1>
        <input className="card-input fs-26 c-white" type="text" placeholder="xxxx  xxxx  xxxx  xxxx"
          name="number" onChange={this.props.update} value={this.props.form.number} maxLength="22" />
        <div className="flex">
          <div className="expiration">
            <h1 className="fs-18 c-white">Expiration</h1>
            <div className="flex">
              <input className="fs-22 c-white" type="text" placeholder="January"
                name="expMonth" onChange={this.props.update} value={this.props.form.expMonth} />
              <input className="fs-22 c-white" type="text" placeholder="2020" maxLength="4"
                name="expYear" onChange={this.props.update} value={this.props.form.expYear} />
            </div>
          </div>
          <div className="ccv">
            <h1 className="fs-18 c-white">CCV</h1>
            <input className="fs-22 c-white" type="text" placeholder="xxx"
              name="ccv" onChange={this.props.update} value={this.props.form.ccv} maxLength="3" />
          </div>
        </div>
      </div>
    );
  }
}

export default CreditCard;
