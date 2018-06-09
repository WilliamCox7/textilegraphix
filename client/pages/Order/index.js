import { React, Component, connect, NumberFormat, MediaQuery } from '../../packages';
import { getAsset, toggle, setProduct } from '../../modules';
import { updOrder, removeOrder } from '../../reducers/cart';
import { WaitIndicator, SizingForm } from '../../components';
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
      projectName: '',
      first: '',
      last: '',
      company: '',
      phone: '',
      email: '',
      confirm: '',
      error: false,
      thankyou: false,
      waiting: false,
      builder: false,
      overlay: false,
      editOrder: undefined
    }
    this.selectOrderMockup = this.selectOrderMockup.bind(this);
    this.toggleMockup = this.toggleMockup.bind(this);
    this.updOrder = this.updOrder.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.prepareAttachments = this.prepareAttachments.bind(this);
    this.toggle = this.toggle.bind(this);
    this.buildCardSubHeader = this.buildCardSubHeader.bind(this);
    this.setProduct = this.setProduct.bind(this);
  }

  render() {

    let orderTotal = 0;

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
        <h1 className="fs-30 c-blue fw-bold">Quote Submission Form</h1>
        <div className="flex">
          <div className="left">
            <input className="project-name fs-34 c-gray-1 fw-bold" type="text" placeholder="*Project Name"
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
                <MediaQuery className="delivery" maxWidth={650}>
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
                <MediaQuery maxWidth={650}>
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
                <span className="close" onClick={() => this.toggle('thankyou')}><img src={getAsset('close-x-black')} /></span>
              </div>
            ) : null}
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
  initBuilder: initBuilder
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
