import React, { Component } from 'react';
import { connect } from 'react-redux';
import emptyBox from '../../src/empty-box.svg';
import Mockup from '../Mockup/Mockup';
import Summary from '../Summary/Summary';
import './Submit.scss';

class Submit extends Component {
  render() {

    var files = this.props.modal.images.map((file, i) => {
      return <h5 key={i}>{file.name}</h5>;
    });

    var quotes = this.props.cart.products.map((product, i) => {
      return <Summary summary={product} key={i} />;
    });
    
    return (
      <div className="Submit">
        <div className="left-side">
          <h1>Quote Submission Form</h1>
          <input className="project-name" type="text" placeholder="Project Name" />
          <h4>Uploaded Files</h4>
          <h5>We recommend AI or PSD files, sized to print or 300DPI</h5>
          <div className="files">
            {files}
          </div>
          <button>+ Upload</button>
          <h4>Contact Information</h4>
          <div className="input-section">
            <input type="text" placeholder="*First" />
            <input type="text" placeholder="*Last" />
            <input type="text" placeholder="Company" />
            <input type="text" placeholder="*Phone" />
            <input type="text" placeholder="*Email" />
            <input type="text" placeholder="*Confirm Email" />
          </div>
          <h4>Shipping Information</h4>
          <div className="input-section">
            <input type="text" placeholder="*Company / Name" />
            <input type="text" placeholder="attn:" />
            <input type="text" placeholder="*Address 1" />
            <input type="text" placeholder="Address 2" />
            <input type="text" placeholder="*City" />
            <div className="shared-inputs">
              <input type="text" placeholder="*State" />
              <input type="text" placeholder="*Zip" />
            </div>
          </div>
          <div className="checkbox-section">
            <img src={emptyBox} />
            Pick Up in Rexburg, Idaho
          </div>
          <textarea placeholder="Notes..."></textarea>
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
          <Mockup />
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
