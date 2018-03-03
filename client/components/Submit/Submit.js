import { React, Component, connect, moment, axios } from '../../packages';
import { Mockup, Summary, ProductNav } from '../components';
import { radioEmpty, radioFilled } from '../../assets';
import './Submit.scss';

const endOfYear = [
  'December 23rd', 'December 24th', 'December 25th', 'December 26th',
  'December 27th', 'December 28th', 'December 29th', 'December 30th',
  'December 31st', 'January 1st', 'January 2nd'
]

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
      notes: '',
      delivery: ''
    }
    this.togglePickup = this.togglePickup.bind(this);
    this.update = this.update.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
  }

  componentDidMount() {
    this.setDelivery();
  }

  setDelivery() {
    var today = moment();
    var year = today.get('year');
    if (today.get('month') === 11) {
      year = today.add(1, 'years').get('year');
    }
    var deliveryDay = moment(today).add(14, 'days');
    var estDelDay = deliveryDay.format('MMMM Do');
    if (JSON.stringify(endOfYear).indexOf(estDelDay) > -1) {
      deliveryDay = moment("01-03-"+year);
    }
    var weekday = deliveryDay.weekday();
    if (weekday === 0) { deliveryDay.add(1, 'days'); }
    else if (weekday === 6) { deliveryDay.add(2, 'days'); }
    var displayedDay = deliveryDay.format('MMMM Do');
    this.setState({delivery: displayedDay});
  }

  togglePickup() {
    this.setState({pickup: !this.state.pickup});
  }

  update(e) {
    var newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  sendOrder() {
    let html = `
      <img src='www.textilegraphix.com/test.png'/>
      <h1 style='max-width: 450px; padding: 5px; border-bottom: solid 1px #44B1DE; color: #58595B'>${this.state.projectName ? this.state.projectName : 'Your Order'}</h1>
      <h3 style='color: #58595B; padding: 0px 5px'>Contact Information</h3>
      <div style='padding: 0px 5px'>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.first + ' ' + this.state.last}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.company ? this.state.company : ''}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.phone}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.email}</div>
      </div>
      <h3 style='color: #58595B; padding: 0px 5px'>Shipping Information</h3>
      <div style='padding: 0px 5px'>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.companyName}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.attn ? 'attn:' + this.state.attn : ''}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.address1 + ' ' + this.state.address2}</div>
        <div style='color: #58595B; padding: 1px 0px'>${this.state.city + ' ' + this.state.state + ', ' + this.state.zip}</div>
        <p style='max-width: 450px'>${this.state.notes ? this.state.notes : ''}</p>
        ${this.state.pickup ? '<h4 style="color: #58595B;">Pick up in Rexburg</h4>' : '<h4 style="color: #58595B;">Will be delivered by</h4>'}
        <div style='color: #58595B; padding: 1px 0px'>${this.state.delivery}</div>
        <div style='color: #44B1DE; padding: 1px 0px'>Total Cost: $189.99</div>
      </div>
    `;
    let data = Object.assign({}, this.state);
    data.html = html;
    var fd = new FormData();
    console.log(this.props.cart.products);
    data.attachments = this.props.cart.products.forEach((product) => {
      var filename = product.guid + '.zip';
      console.log(product.attachment);
      fd.append('upl', product.attachment, filename);
    });
    console.log(fd);
    axios.post('/order', fd).then(() => {

    });
  }

  render() {

    var files = [];

    var quotes = this.props.cart.products.map((product, i) => {
      return <Summary summary={product} key={i} />;
    });

    var mockups = this.props.cart.products.map((product, i) => {
      return <Mockup product={product} key={product.guid} edit={false} />;
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
            <h4>{this.state.delivery}</h4>
          </div>
          <div className="submit-form" onClick={this.sendOrder}>Submit</div>
          <h5 className="explain-text">A member from our team will</h5>
          <h5 className="explain-text">contact you within 1 to 2 business days</h5>
        </div>
        <div className="right-side">
          <div className="mockups-container">
            <div className="mockups" id="product-container" style={{"width": this.props.cart.products.length * 326 + "px"}}>
              {mockups}
            </div>
          </div>
          {this.props.cart.products.length > 1 ? (
            <ProductNav length={this.props.cart.products.length} products={this.props.cart.products} />
          ) : null}
          <h2 className="your-order">Your Order</h2>
          {quotes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Submit);
