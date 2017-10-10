import React, { Component } from 'react';
import { connect } from 'react-redux';
import radioEmpty from '../../src/radio-empty.svg';
import radioFilled from '../../src/radio-filled.svg';
import Mockup from '../Mockup/Mockup';
import Summary from '../Summary/Summary';
import './Submit.scss';

class Submit extends Component {

  constructor() {
    super();
    this.state = {
      projectName: '',
      first: '',
      last: '',
      company: '',
      phone: '',
      email: '',
      confirm: '',
      companyName: '',
      attn: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zip: '',
      pickup: false,
      notes: ''
    }
    this.togglePickup = this.togglePickup.bind(this);
    this.update = this.update.bind(this);
  }

  togglePickup() {
    this.setState({pickup: !this.state.pickup});
  }

  update(e) {
    var newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  render() {

    var files = this.props.modal.images.map((file, i) => {
      return <h5 key={i}>{file.name}</h5>;
    });

    var quotes = this.props.cart.products.map((product, i) => {
      return <Summary summary={product} key={i} />;
    });

    var mockups = this.props.cart.products.map((product, i) => {
      return <Mockup image={product.image} key={i} edit={false} />;
    });

    return (
      <div className="Submit">
        <div className="left-side">
          <h1>Quote Submission Form</h1>
          <input className="project-name" type="text" placeholder="Project Name"
            value={this.state.projectName} onChange={this.update} name="projectName" />
          <h4>Uploaded Files</h4>
          <h5>We recommend AI or PSD files, sized to print or 300DPI</h5>
          <div className="files">
            {files}
          </div>
          <button>+ Upload</button>
          <h4>Contact Information</h4>
          <div className="input-section">
            <input type="text" placeholder="*First"
              value={this.state.first} onChange={this.update} name="first" />
            <input type="text" placeholder="*Last"
              value={this.state.last} onChange={this.update} name="last" />
            <input type="text" placeholder="Company"
              value={this.state.company} onChange={this.update} name="company" />
            <input type="text" placeholder="*Phone"
              value={this.state.phone} onChange={this.update} name="phone" />
            <input type="text" placeholder="*Email"
              value={this.state.email} onChange={this.update} name="email" />
            <input type="text" placeholder="*Confirm Email"
              value={this.state.confirm} onChange={this.update} name="confirm" />
          </div>
          <h4>Shipping Information</h4>
          <div className="input-section">
            <input type="text" placeholder="*Company / Name"
              value={this.state.companyName} onChange={this.update} name="companyName" />
            <input type="text" placeholder="attn:"
              value={this.state.attn} onChange={this.update} name="attn" />
            <input type="text" placeholder="*Address 1"
              value={this.state.address1} onChange={this.update} name="address1" />
            <input type="text" placeholder="Address 2"
              value={this.state.address2} onChange={this.update} name="address2" />
            <input type="text" placeholder="*City"
              value={this.state.city} onChange={this.update} name="city" />
            <div className="shared-inputs">
              <input type="text" placeholder="*State"
                value={this.state.state} onChange={this.update} name="state" />
              <input type="text" placeholder="*Zip"
                value={this.state.zip} onChange={this.update} name="zip" />
            </div>
          </div>
          <div className="checkbox-section">
            <img src={this.state.pickup ? radioFilled : radioEmpty}
              onClick={this.togglePickup} />
            Pick Up in Rexburg, Idaho
          </div>
          <textarea placeholder="Notes..." value={this.state.notes}
            onChange={this.update} name="notes"></textarea>
          <h4>Total + Estimated Delivery</h4>
          <div className="details">
            <h5>Est. Total with Taxes + Shipping</h5>
            <h5>Est. Delivery</h5>
            <h4>$0,0000.00</h4>
            <h4>September 29</h4>
          </div>
          <div className="submit-form">Submit</div>
          <h5 className="explain-text">A member from our team will</h5>
          <h5 className="explain-text">contact you within 1 to 2 business days</h5>
        </div>
        <div className="right-side">
          {mockups[0]}
          <h2 className="your-order">Your Order</h2>
          {quotes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Submit);
