import { React, Component, connect, NumberFormat, MediaQuery, axios } from '../../packages';
import { calculateTotalCost, buildOrderHtml, getAsset } from '../../modules';
import { updOrder, removeOrder } from '../../reducers/cart';
import { WaitIndicator } from '../../components';
import './style.scss';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mockup: props.cart.orders.length > 0 ? props.cart.orders[0].mockup : undefined,
      guid: props.cart.orders.length > 0 ? props.cart.orders[0].guid : undefined,
      mockupIndex: 0,
      files: [],
      projectName: '',
      first: '',
      last: '',
      company: '',
      phone: '',
      email: '',
      confirm: '',
      error: false,
      thankyou: false,
      waiting: false
    }
    this.selectOrderMockup = this.selectOrderMockup.bind(this);
    this.toggleMockup = this.toggleMockup.bind(this);
    this.updOrder = this.updOrder.bind(this);
    this.calculateTotalCost = this.calculateTotalCost.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.prepareAttachments = this.prepareAttachments.bind(this);
    this.toggleThankYou = this.toggleThankYou.bind(this);
    this.toggleWaitIndicator = this.toggleWaitIndicator.bind(this);
  }

  calculateTotalCost(order) {
    let results = calculateTotalCost(order);
    let updOrder = Object.assign({}, order);
    updOrder.total = results.totalCost;
    this.props.updOrder(updOrder);
  }

  selectOrderMockup(order) {
    let newState = Object.assign({}, this.state);
    newState.mockup = order.mockup;
    newState.guid = order.guid;
    this.setState(newState);
  }

  toggleMockup(index) {
    this.setState({mockupIndex: index});
  }

  updOrder(e, order) {
    if (!isNaN(e.target.value)) {
      let updOrder = Object.assign({}, order);
      updOrder[e.target.name] = Number(e.target.value);
      updOrder.quantity = 0;
      if (updOrder.XS) updOrder.quantity += updOrder.XS;
      if (updOrder.S) updOrder.quantity += updOrder.S;
      if (updOrder.M) updOrder.quantity += updOrder.M;
      if (updOrder.L) updOrder.quantity += updOrder.L;
      if (updOrder.XL) updOrder.quantity += updOrder.XL;
      if (updOrder.XL2) updOrder.quantity += updOrder.XL2;
      if (updOrder.XL3) updOrder.quantity += updOrder.XL3;
      if (updOrder.XL4) updOrder.quantity += updOrder.XL4;
      this.calculateTotalCost(updOrder);
    }
  }

  storeFile(e) {
    let newState = Object.assign({}, this.state);
    var reader = new FileReader();
    var fileName = e.currentTarget.files[0].name;
    reader.onloadend = () => {
      newState.files.push({data: reader.result, name: fileName});
      this.setState(newState);
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
    document.getElementById('uploadButton').value = '';
  }

  updateInput(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  sendOrder() {
    if (this.state.first && this.state.last && this.state.phone && this.state.email
        && this.state.email.toLowerCase() === this.state.confirm.toLowerCase()) {
      this.toggleWaitIndicator();
      axios.post('/order', {
        to: this.state.email,
        from: `${this.state.first} ${this.state.last}`,
        order: buildOrderHtml(this.state, this.props.cart.orders),
        attachments: this.prepareAttachments()
      }).then((response) => {
        this.toggleThankYou();
        this.toggleWaitIndicator();
      }).catch((error) => {
        axios.post('/error', {error: error});
      });
    } else {
      this.setState({error: true});
    }
  }

  prepareAttachments() {
    let attachments = [];
    this.props.cart.orders.forEach((order) => {
      attachments.push({
        filename: `${order.guid}-front.png`,
        path: order.mockup[0]
      });
      attachments.push({
        filename: `${order.guid}-back.png`,
        path: order.mockup[1]
      });
      order.uploaded.front.forEach((upload, i) => {
        var ext = upload.name.split('.').pop();
        attachments.push({
          filename: `${order.guid}-${i+1}-upload-front.${ext}`,
          path: upload.src
        });
      });
      order.uploaded.back.forEach((upload, i) => {
        var ext = upload.name.split('.').pop();
        attachments.push({
          filename: `${order.guid}-${i+1}-upload-back.${ext}`,
          path: upload.src
        });
      });
    });
    this.state.files.forEach((file, i) => {
      var ext = file.name.split('.').pop();
      attachments.push({
        filename: `other-uploads-${i+1}-other-upload.${ext}`,
        path: file.data
      });
    });
    return attachments;
  }

  removeOrder(guid) {
    let foundUnselected = false, index = 0;
    if (guid === this.state.guid) {
      while (!foundUnselected) {
        if (guid !== this.props.cart.orders[index].guid) {
          this.selectOrderMockup(this.props.cart.orders[index]);
          foundUnselected = true;
        } else if (this.props.cart.orders.length - 1 === index) {
          this.selectOrderMockup({
            mockup: undefined,
            guid: undefined
          });
          foundUnselected = true;
        }
        index++;
      }
    }
    this.props.removeOrder(guid);
  }

  toggleThankYou() {
    this.setState({thankyou: !this.state.thankyou});
  }

  toggleWaitIndicator() {
    this.setState({waiting: !this.state.waiting});
  }

  render() {

    let orderTotal = 0;

    let orders = this.props.cart.orders.map((order, i) => {
      orderTotal += Number(order.total);
      return (
        <div key={i} className="order flex ai-c jc-sb">
          <i className="fas fa-arrow-right" style={this.state.guid === order.guid ? {
            "color": "#44B1DE"
          } : null}></i>
          <div className="sizes-card" onClick={() => this.selectOrderMockup(order)}>
            <h1 className="fs-18 c-gray-1 fw-bold">{order.product.brand} {order.product.number}</h1>
            <h1 className="fs-18 c-gray-2">{order.selectedColor}</h1>
            <div className="sizes-price flex">
              <div className="sizes flex">
                <div className="size">
                  <input type="text" name="XS" onChange={(e) => this.updOrder(e, order)}
                    value={order.XS} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">XS</h1>
                </div>
                <div className="size">
                  <input type="text" name="S" onChange={(e) => this.updOrder(e, order)}
                     value={order.S} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">S</h1>
                </div>
                <div className="size">
                  <input type="text" name="M" onChange={(e) => this.updOrder(e, order)}
                     value={order.M} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">M</h1>
                </div>
                <div className="size">
                  <input type="text" name="L" onChange={(e) => this.updOrder(e, order)}
                     value={order.L} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">L</h1>
                </div>
                <div className="size">
                  <input type="text" name="XL" onChange={(e) => this.updOrder(e, order)}
                     value={order.XL} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">XL</h1>
                </div>
                <div className="size">
                  <input type="text" name="XL2" onChange={(e) => this.updOrder(e, order)}
                     value={order.XL2} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">2XL</h1>
                </div>
                <div className="size">
                  <input type="text" name="XL3" onChange={(e) => this.updOrder(e, order)}
                     value={order.XL3} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">3XL</h1>
                </div>
                <div className="size">
                  <input type="text" name="XL4" onChange={(e) => this.updOrder(e, order)}
                     value={order.XL4} className="fs-18 c-gray-1" placeholder="0" />
                  <h1 className="fs-18 c-gray-3">4XL</h1>
                </div>
              </div>
              <div className="total">
                <h1 className="fs-18 c-gray-1">{order.quantity}</h1>
                <h1 className="fs-18 c-gray-3">TOTAL</h1>
              </div>
              <MediaQuery minWidth={800}>
                <div className="price">
                  <h1 className="fs-16 c-blue">Total Price:</h1>
                  <h1 className="fs-24 c-gray-1">
                    <NumberFormat value={order.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  </h1>
                </div>
              </MediaQuery>
            </div>
          </div>
          <span className="garbage" onClick={() => this.removeOrder(order.guid)}>
            <img src={getAsset('garbage')} />
          </span>
        </div>
      );
    });

    let filenames = this.state.files.map((file, i) => {
      return <li key={i}><h1 className="fs-14 c-gray-1">• {file.name}</h1></li>;
    });

    return (
      <div className="Order">
        <h1 className="fs-30 c-blue fw-bold">Quote Submission Form</h1>
        <div className="flex">
          <div className="left">
            <input className="project-name fs-34 c-gray-1 fw-bold" type="text" placeholder="Project Name"
              onChange={this.updateInput} value={this.state.projectName} name="projectName" />
            <MediaQuery maxWidth={1400}>
              <div className="mockup flex jc-c">
                <div className="side-buttons-left flex fd-c">
                  <span onClick={() => this.toggleMockup(0)}>
                    <img src={getAsset('front-side-button')} />
                  </span>
                  <span onClick={() => this.toggleMockup(1)}>
                    <img src={getAsset('back-side-button')} />
                  </span>
                </div>
                {this.state.mockup ? (
                  <img src={this.state.mockup[this.state.mockupIndex]} />
                ) : null}
              </div>
            </MediaQuery>
            <div className="orders-in-cart">
              {orders}
            </div>
            <MediaQuery minWidth={550}>
              <div className="uploaded-files">
                <h1 className="fs-17 c-gray-1 fw-bold">Uploaded Files</h1>
                <h1 className="fs-14 c-gray-3">We recommend AI or PSD files, sized to print or 300DPI.</h1>
                <ul>
                  {filenames}
                </ul>
                <button className="fs-17 c-white" onClick={
                  () => document.getElementById('uploadButton').click()
                }>+ Upload</button>
                <input id="uploadButton" type="file" onChange={this.storeFile} />
              </div>
            </MediaQuery>
          </div>
          <MediaQuery minWidth={1400}>
            <div className="right">
              <div className="mockup flex jc-c">
                <div className="side-buttons-left flex fd-c">
                  <span onClick={() => this.toggleMockup(0)}>
                    <img src={getAsset('front-side-button')} />
                  </span>
                  <span onClick={() => this.toggleMockup(1)}>
                    <img src={getAsset('back-side-button')} />
                  </span>
                </div>
                {this.state.mockup ? (
                  <img src={this.state.mockup[this.state.mockupIndex]} />
                ) : null}
              </div>
            </div>
          </MediaQuery>
        </div>
        <div className="bottom-section flex">
          <div className="order-form">
            <h1 className="fs-28 c-gray-1 fw-bold">Contact Information</h1>
            <div className="form flex fw-w jc-sb">
              <input type="text" name="first" placeholder="*First" onChange={this.updateInput} />
              <input type="text" name="last" placeholder="*Last" onChange={this.updateInput} />
              <input type="text" name="company" placeholder="Company" onChange={this.updateInput} />
              <input type="text" name="phone" placeholder="*Phone" onChange={this.updateInput} />
              <input type="text" name="email" placeholder="*Email" onChange={this.updateInput} />
              <input type="text" name="confirm" placeholder="*Confirm Email" onChange={this.updateInput} />
            </div>
          </div>
          <div className="order-details">
            <h1 className="fs-28 c-gray-1 fw-bold">Total + Estimated Delivery</h1>
            <div className="details-wrapper flex jc-sb">
              <div className="details-side-left">
                <h1 className="fs-20 c-gray-3">Est. Total + Shipping</h1>
                <h1 className="fs-20 c-gray-1 fw-bold">
                  <NumberFormat value={orderTotal} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                </h1>
                <p className="fs-16 c-blue">
                  *Prices are subject to change depending on order details.
                </p>
                <MediaQuery className="delivery" maxWidth={550}>
                  <h1 className="fs-20 c-gray-3">Est. Delivery</h1>
                  <h1 className="fs-24 c-gray-1 fw-bold">{this.props.cart.orders.length ? this.props.cart.orders[0].delivery : null}</h1>
                </MediaQuery>
                {this.state.error ? (
                  <h1 className="fs-16 fw-bold" style={{'color': 'red'}}>
                    *Please fill in all required fields
                  </h1>
                ) : null}
              </div>
              <div className="details-side-right">
                <a className="fs-57 c-blue fw-bold" onClick={this.sendOrder}>
                  Submit <i className="fas fa-arrow-right"></i>
                </a>
                <MediaQuery maxWidth={550}>
                  {(matches) => {
                    if (matches) {
                      return (
                        <p className="fs-16 c-gray-3">
                          By submitting you are giving our account
                          managers permission to contact you about
                          the order details. Payment is not due until
                          you and one of our representatives agree to
                          produce the order. A member from our team
                          will contact you within 1 to 2 business days.
                        </p>
                      );
                    } else {
                      return (
                        <p className="fs-16 c-gray-3">
                          A member from our team will contact you within 1 to 2 business days
                        </p>
                      );
                    }
                  }}
                </MediaQuery>
              </div>
            </div>
            {this.state.thankyou ? (
              <div className="thank-you flex jc-c ai-c fd-c">
                <span className="thumbs-up"><img src={getAsset('thumbs-up')} /></span>
                <h1 className="fs-30 c-black fw-bold">Thanks for the Inquery!</h1>
                <h1 className="fs-18 c-black">One of our staff members will be in contact with you shortly!</h1>
                <span className="close" onClick={this.toggleThankYou}><img src={getAsset('close-x-black')} /></span>
              </div>
            ) : null}
          </div>
        </div>
        <WaitIndicator message="Placing your order..." waiting={this.state.waiting}></WaitIndicator>
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
  updOrder: updOrder,
  removeOrder: removeOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
