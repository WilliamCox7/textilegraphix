import { React } from '../../../packages';
import { radioFilled, radioEmpty } from '../../../assets';
import { Mockup, Summary } from '../../index';

export function template(Submit) {
  var files = Submit.props.modal.images.map((file, i) => {
    return <h5 key={i}>{file.name}</h5>;
  });

  var quotes = Submit.props.cart.products.map((product, i) => {
    return <Summary summary={product} key={i} />;
  });

  var mockups = Submit.props.cart.products.map((product, i) => {
    return <Mockup image={product.image} key={i} edit={false} />;
  });

  return (
    <div className="Submit">
      <div className="left-side">
        <h1>Quote Submission Form</h1>
        <input className="project-name" type="text" placeholder="Project Name"
          value={Submit.state.projectName} onChange={Submit.update} name="projectName" />
        <h4>Uploaded Files</h4>
        <h5>We recommend AI or PSD files, sized to print or 300DPI</h5>
        <div className="files">
          {files}
        </div>
        <button>+ Upload</button>
        <h4>Contact Information</h4>
        <div className="input-section">
          <input type="text" placeholder="*First"
            value={Submit.state.first} onChange={Submit.update} name="first" />
          <input type="text" placeholder="*Last"
            value={Submit.state.last} onChange={Submit.update} name="last" />
          <input type="text" placeholder="Company"
            value={Submit.state.company} onChange={Submit.update} name="company" />
          <input type="text" placeholder="*Phone"
            value={Submit.state.phone} onChange={Submit.update} name="phone" />
          <input type="text" placeholder="*Email"
            value={Submit.state.email} onChange={Submit.update} name="email" />
          <input type="text" placeholder="*Confirm Email"
            value={Submit.state.confirm} onChange={Submit.update} name="confirm" />
        </div>
        <h4>Shipping Information</h4>
        <div className="input-section">
          <input type="text" placeholder="*Company / Name"
            value={Submit.state.companyName} onChange={Submit.update} name="companyName" />
          <input type="text" placeholder="attn:"
            value={Submit.state.attn} onChange={Submit.update} name="attn" />
          <input type="text" placeholder="*Address 1"
            value={Submit.state.address1} onChange={Submit.update} name="address1" />
          <input type="text" placeholder="Address 2"
            value={Submit.state.address2} onChange={Submit.update} name="address2" />
          <input type="text" placeholder="*City"
            value={Submit.state.city} onChange={Submit.update} name="city" />
          <div className="shared-inputs">
            <input type="text" placeholder="*State"
              value={Submit.state.state} onChange={Submit.update} name="state" />
            <input type="text" placeholder="*Zip"
              value={Submit.state.zip} onChange={Submit.update} name="zip" />
          </div>
        </div>
        <div className="checkbox-section">
          <img src={Submit.state.pickup ? radioFilled : radioEmpty}
            onClick={Submit.togglePickup} />
          Pick Up in Rexburg, Idaho
        </div>
        <textarea placeholder="Notes..." value={Submit.state.notes}
          onChange={Submit.update} name="notes"></textarea>
        <h4>Total + Estimated Delivery</h4>
        <div className="details">
          <h5>Est. Total with Taxes + Shipping</h5>
          <h5>Est. Delivery</h5>
          <h4>$0,0000.00</h4>
          <h4>{Submit.state.delivery}</h4>
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
