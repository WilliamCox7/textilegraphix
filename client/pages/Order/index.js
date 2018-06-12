import { React, Component, connect, NumberFormat, MediaQuery } from '../../packages';
import { getAsset, toggle, setProduct } from '../../modules';
import { updOrder, removeOrder, clearCart } from '../../reducers/cart';
import { WaitIndicator, SizingForm, Processor } from '../../components';
import { initBuilder } from '../../reducers/builder';
import './style.scss';

import * as method from './methods';

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mockup: props.cart.orders.length > 0 ? props.cart.orders[0].mockup : undefined,
      guid: props.cart.orders.length > 0 ? props.cart.orders[0].guid : undefined,
      mockupIndex: 0,
      files: [],
      contact: {
        first: '',
        last: '',
        company: '',
        phone: '',
        email: '',
        confirm: '',
        projectName: ''
      },
      billing: {
        first: '',
        last: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      shipping: {
        first: '',
        last: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        sameAsBilling: false
      },
      error: false,
      submitted: false,
      waiting: false,
      builder: false,
      overlay: false,
      editOrder: undefined,
      taxExempt: false,
      thankYou: false,
      paymentModal: false
    }
    this.selectOrderMockup = this.selectOrderMockup.bind(this);
    this.toggleMockup = this.toggleMockup.bind(this);
    this.updOrder = this.updOrder.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.updateCheckbox = this.updateCheckbox.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.prepareAttachments = this.prepareAttachments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.buildCardSubHeader = this.buildCardSubHeader.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  render() {

    let orderTotal = 0;
    let cartOrders = this.props.cart.orders;

    let orders = this.props.cart.orders.map((order, i) => {
      let locationText = this.buildCardSubHeader(order);
      orderTotal += Number(order.total);
      return (
        <div key={i} className="order flex ai-c jc-sa">
          <i className="fas fa-arrow-right" style={this.state.guid === order.guid ? {
            "color": "#44B1DE"
          } : null}></i>
          <div className="sizes-card" onClick={() => this.selectOrderMockup(order)}>
            <div className="flex card-header">
              <h1 className="fs-18 c-gray-1 fw-bold">{order.product.brand} {order.product.number}</h1>
              <span>-</span><h1 className="fs-18 c-gray-2">{order.selectedColor}</h1>
            </div>
            <h1 className="fs-16 c-gray-1">{locationText}</h1>
            <div className="sizes-price flex">
              <SizingForm order={order} updSizing={this.updOrder} id={i} />
              <div className="total">
                <h1 className="fs-18 c-gray-1">{order.quantity}</h1>
                <h1 className="fs-14 c-gray-3">TOTAL</h1>
              </div>
              <MediaQuery minWidth={800}>
                <div className="price">
                  <h1 className="fs-16 c-white">Cost Per Item:</h1>
                  <h1 className="fs-22 c-white fw-bold">
                    <NumberFormat value={order.totalPerShirt} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} suffix={' ea'} />
                  </h1>
                  <h1 className="fs-16 c-white">Total Cost:</h1>
                  <h1 className="fs-22 c-white fw-bold">
                    <NumberFormat value={order.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  </h1>
                </div>
              </MediaQuery>
            </div>
            <MediaQuery maxWidth={800}>
              <div className="price-mobile flex jc-sb">
                <div className="section flex jc-sb ai-c">
                  <h1 className="fs-16 c-white">Price / Shirt:</h1>
                  <h1 className="fs-16 c-white fw-bold">
                    <NumberFormat value={order.totalPerShirt} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} suffix={' ea'} />
                  </h1>
                </div>
                <div className="section flex jc-sb ai-c">
                  <MediaQuery minWidth={395}>
                    <h1 className="fs-16 c-white">Total Cost:</h1>
                  </MediaQuery>
                  <h1 className="fs-16 c-white fw-bold">
                    <NumberFormat value={order.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  </h1>
                </div>
              </div>
            </MediaQuery>
          </div>
          <div className="card-actions flex fd-c">
            <span className="action-icon flex fd-c ai-c" onClick={() => this.removeOrder(order.guid)}>
              <img src={getAsset('garbage')} />
              <h1 className="fs-12 c-red">DELETE</h1>
            </span>
            <span className="action-icon flex fd-c ai-c" onClick={() => this.setProduct(order, true)}>
              <img src={getAsset('edit-blue')} />
              <h1 className="fs-12 c-blue">EDIT</h1>
            </span>
          </div>
        </div>
      );
    });

    let filenames = this.state.files.map((file, i) => {
      return <li key={i}><h1 className="fs-14 c-gray-1">• {file.name}</h1></li>;
    });

    return (
      <div className="Order" id="current-page">
        <h1 className="h1-fs-30 fs-30 c-blue fw-bold">Quote Submission Form</h1>
        <div className="flex">
          <div className="left">
            <input className="project-name fs-34 c-gray-1 fw-bold" type="text" placeholder="*Project Name"
              onChange={(e) => this.updateInput(e, 'contact')} value={this.state.projectName} name="projectName" />
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
            <MediaQuery minWidth={650}>
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
        <div className="bottom-section flex fw-w jc-sb">
          <div className="order-form">
            <h1 className="fs-24 c-gray-1 fw-bold">Contact Information</h1>
            <div className="form flex fw-w jc-sb">
              <input type="text" name="first" placeholder="*First" onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="last" placeholder="*Last" onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="company" placeholder="Company" onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="phone" placeholder="*Phone" onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="email" placeholder="*Email" onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="confirm" placeholder="*Confirm Email" onChange={(e) => this.updateInput(e, 'contact')} />
            </div>
          </div>
          <div className="order-form">
            <h1 className="fs-24 c-gray-1 fw-bold">Billing Information</h1>
            <div className="form flex fw-w jc-sb">
              <input type="text" name="first" value={this.state.billing.first} placeholder="*First" onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="last" value={this.state.billing.last} placeholder="*Last" onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="address" value={this.state.billing.address} placeholder="*Address" onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="city" value={this.state.billing.city} placeholder="*City" onChange={(e) => this.updateInput(e, 'billing')} />
              <MediaQuery minWidth={650}>
                <input type="text" name="state" value={this.state.billing.state} placeholder="*State" onChange={(e) => this.updateInput(e, 'billing')} />
              </MediaQuery>
              <MediaQuery minWidth={650}>
                <input type="text" name="zip" value={this.state.billing.zip} placeholder="*Zip Code" onChange={(e) => this.updateInput(e, 'billing')} />
              </MediaQuery>
              <MediaQuery maxWidth={650}>
                <div className="mult-input flex jc-sb">
                  <input type="text" name="state" value={this.state.billing.state} placeholder="*State" onChange={(e) => this.updateInput(e, 'billing')} />
                  <input type="text" name="zip" value={this.state.billing.zip} placeholder="*Zip Code" onChange={(e) => this.updateInput(e, 'billing')} />
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className="order-form">
            <MediaQuery minWidth={650}>
              <div className="shipping-header flex jc-sb">
                <h1 className="fs-24 c-gray-1 fw-bold">Shipping Information</h1>
                <div className="checkbox flex jc-sb">
                  <label>
                    <input type="checkbox" checked={this.state.shipping.sameAsBilling}
                      name="sameAsBilling" onClick={(e) => this.updateCheckbox(e, 'shipping')} />
                    <span></span>
                  </label>
                  <h1 className="fs-16 c-black">SAME AS BILLING</h1>
                </div>
              </div>
            </MediaQuery>
            <MediaQuery maxWidth={650}>
              <div>
                <h1 className="fs-24 c-gray-1 fw-bold">Shipping Information</h1>
                <div className="checkbox flex jc-sb">
                  <label>
                    <input type="checkbox" checked={this.state.shipping.sameAsBilling}
                      name="sameAsBilling" onClick={(e) => this.updateCheckbox(e, 'shipping')} />
                    <span></span>
                  </label>
                  <h1 className="fs-16 c-black">SAME AS BILLING</h1>
                </div>
              </div>
            </MediaQuery>
            <div className="form flex fw-w jc-sb">
              <input type="text" name="first" value={this.state.shipping.first} placeholder="*First" onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="last" value={this.state.shipping.last} placeholder="*Last" onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="address" value={this.state.shipping.address} placeholder="Address" onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="city" value={this.state.shipping.city} placeholder="*City" onChange={(e) => this.updateInput(e, 'shipping')} />
              <MediaQuery minWidth={650}>
                <input type="text" name="state" value={this.state.shipping.state} placeholder="*State" onChange={(e) => this.updateInput(e, 'shipping')} />
              </MediaQuery>
              <MediaQuery minWidth={650}>
                <input type="text" name="zip" value={this.state.shipping.zip} placeholder="*Zip Code" onChange={(e) => this.updateInput(e, 'shipping')} />
              </MediaQuery>
              <MediaQuery maxWidth={650}>
                <div className="mult-input flex jc-sb">
                  <input type="text" name="state" value={this.state.shipping.state} placeholder="*State" onChange={(e) => this.updateInput(e, 'shipping')} />
                  <input type="text" name="zip" value={this.state.shipping.zip} placeholder="*Zip Code" onChange={(e) => this.updateInput(e, 'shipping')} />
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className="order-details">
            {this.state.submitted ? (
              <MediaQuery minWidth={650}>
                <h1 className="fs-24 c-green fw-bold">Order Successfully Submitted!</h1>
              </MediaQuery>
            ) : null}
            {this.state.error && !this.state.submitted ? (
              <h1 className="fs-24 c-red fw-bold">{this.state.error}</h1>
            ) : null}
            <MediaQuery maxWidth={650}>
              <h1 className="fs-24 c-black-2 fw-bold">Total + Free Shipping</h1>
            </MediaQuery>
            <div className="total-price-box flex jc-sb">
              <div className="total-price">
                <MediaQuery minWidth={650}>
                  <h1 className="fs-20 c-gray-3">Total + Free Shipping</h1>
                </MediaQuery>
                <h1 className="fs-56 fw-bold c-black-2 flex">
                  <NumberFormat value={orderTotal} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  <MediaQuery maxWidth={650} minWidth={360}>
                    <p className="fs-16 c-gray-3">+ Tax</p>
                  </MediaQuery>
                </h1>
                <div className="checkbox flex jc-sb">
                  <label>
                    <input type="checkbox" checked={this.state.taxExempt}
                      name="taxExempt" onClick={this.updateCheckbox} />
                    <span></span>
                  </label>
                  <h1 className="fs-16 c-black">Check Box If Tax Exempt</h1>
                </div>
              </div>
              <MediaQuery minWidth={650}>
                <div className="total-price-buttons flex fd-c jc-sb">
                  <button className="fs-28 c-white flex ai-c" onClick={() => this.sendOrder('buy-now', orderTotal)}>
                    BUY NOW <img src={getAsset('buy-now')} />
                  </button>
                  <button className="fs-20 c-blue flex ai-c" onClick={() => this.sendOrder('bill-later', orderTotal)}>
                    BILL ME LATER <img src={getAsset('bill-me-later')} />
                  </button>
                </div>
              </MediaQuery>
            </div>
            <MediaQuery maxWidth={650}>
              <div className="total-price-buttons-mobile flex jc-sb">
                <button className="fs-28 c-white flex ai-c" onClick={() => this.sendOrder('buy-now', orderTotal)}>
                  BUY NOW <img src={getAsset('buy-now')} />
                </button>
                <button className="fs-20 c-blue flex ai-c" onClick={() => this.sendOrder('bill-later', orderTotal)}>
                  BILL ME LATER <img src={getAsset('bill-me-later')} />
                </button>
              </div>
            </MediaQuery>
            <div className="descriptions flex">
              <div className="desc-section">
                <h1 className="fs-12 c-gray-3">*BILL ME LATER</h1>
                <p className="fs-12 c-gray-3">
                  This option is only availible for orders over the amount
                  of $500, upon submiting our account specialists will
                  discuss payment options.
                </p>
              </div>
              <div className="desc-section">
                <h1 className="fs-12 c-gray-3">*BUY NOW</h1>
                <p className="fs-12 c-gray-3">
                  Upon submitting, your card will be authorized but will
                  not be charged until the order has been shipped.
                </p>
              </div>
            </div>
            {this.state.thankYou ? (
              <MediaQuery maxWidth={650}>
                <div className="thank-you flex jc-c ai-c fd-c">
                  <span className="thumbs-up"><img src={getAsset('thumbs-up')} /></span>
                  <h1 className="h1-fs-30 fs-30 c-black fw-bold">Thanks for the Inquery!</h1>
                  <h1 className="fs-18 c-black">One of our staff members will be in contact with you shortly!</h1>
                  <span className="close" onClick={() => this.toggle('thankYou')}><img src={getAsset('close-x-black')} /></span>
                </div>
              </MediaQuery>
            ) : null}
            {this.state.paymentModal ? (
              <Processor total={orderTotal} exempt={this.state.taxExempt} orders={cartOrders}
                first={this.state.contact.first} last={this.state.contact.last} toggle={this.toggle} />
            ) : null}
            <MediaQuery maxWidth={650}>
              <div className="gray-background"></div>
            </MediaQuery>
          </div>
        </div>
        <WaitIndicator message="Placing your order..." waiting={this.state.waiting} />
      </div>
    );
  }
}

Order.prototype.selectOrderMockup = method.selectOrderMockup;
Order.prototype.toggleMockup = method.toggleMockup;
Order.prototype.updOrder = method.updOrder;
Order.prototype.calculateCost = method.calculateCost;
Order.prototype.storeFile = method.storeFile;
Order.prototype.updateInput = method.updateInput;
Order.prototype.updateCheckbox = method.updateCheckbox;
Order.prototype.sendOrder = method.sendOrder;
Order.prototype.removeOrder = method.removeOrder;
Order.prototype.prepareAttachments = method.prepareAttachments;
Order.prototype.buildCardSubHeader = method.buildCardSubHeader;
Order.prototype.toggle = toggle;
Order.prototype.setProduct = setProduct;

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = {
  updOrder: updOrder,
  removeOrder: removeOrder,
  initBuilder: initBuilder,
  clearCart: clearCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
