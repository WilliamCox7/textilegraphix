import React, { Component } from 'react';
import { getAsset } from '../../modules';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';
import SizeForm from '../../components/SizeForm';
import Processor from '../../components/Processor';
import WaitIndicator from '../../components/WaitIndicator';
import MainFooter from '../../components/MainFooter';
import * as methods from './methods';
import { removeOrder } from '../../reducers/cart';
import { initializeBuilder } from '../../reducers/builder';
import { setDelivery, toggle } from '../../modules';
import './style.scss';

class Checkout extends Component {

  constructor(props) {
    super(props);
    let extended = props.cart.orders.map((o) => false);
    this.state = {
      selected: 0,
      extended: extended,
      delivery: setDelivery(4),
      selectedShippingMethod: 'ground',
      contact: {
        phone: '',
        email: '',
        confirm: ''
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
      paymentModal: false,
      error: false,
      waiting: false
    }
    this.buildCardSubHeader = this.buildCardSubHeader.bind(this);
    this.updOrder = this.updOrder.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.setProduct = this.setProduct.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    this.extendPrice = this.extendPrice.bind(this);
    this.extendPriceMobile = this.extendPriceMobile.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.toggleSameAsBilling = this.toggleSameAsBilling.bind(this);
    this.updateShippingMethod = this.updateShippingMethod.bind(this);
    this.toggle = this.toggle.bind(this);
    this.sendOrder = this.sendOrder.bind(this);
    this.prepareAttachments = this.prepareAttachments.bind(this);
  }

  render() {

    let orderTotal = 0;
    let orders = this.props.cart.orders;
    let display = orders.length ? true : false;
    let deliveryOpts = methods.getDeliveryOptions();

    let items = orders.map((order, i) => {
      let locationText = this.buildCardSubHeader(order);
      orderTotal += Number(order.total);
      return (
        <div key={i} className="order flex ai-c jc-sa">
          <div className="sizes-card">
            <div className="flex card-header">
              <h1 className="brand-header">{order.product.brand} {order.product.number}</h1>
              <span>-</span><h1 className="color-header">{order.selectedColor}</h1>
            </div>
            <h1 className="location-header">{locationText}</h1>
            <div className="sizes-price flex">
              <MediaQuery minWidth={690}>
                <SizeForm form={order} updateSize={this.updOrder} size="medium" />
              </MediaQuery>
              <MediaQuery maxWidth={689}>
                <SizeForm form={order} updateSize={this.updOrder} size="small" />
              </MediaQuery>
              <MediaQuery minWidth={480}>
                <div id={`price-box-wrapper-${i}`} className="price-box-wrapper" onClick={() => this.extendPrice(i)}>
                  <div id={`blue-arrow-${i}`} className="blue-arrow"></div>
                  <div className="price flex">
                    <div id={`price-typical-${i}`} className="price-typical">
                      <h1>Cost Per Item:</h1>
                      <h3>XS-XL</h3>
                      <h2 className="space-below">
                        <NumberFormat value={order.totalPerShirt} displayType={'text'}
                          thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                      </h2>
                      <h1>Total Cost:</h1>
                      <h2>
                        <NumberFormat value={order.total} displayType={'text'}
                          thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      </h2>
                    </div>
                    <div className="price-extended flex fw-w">
                      <div className="corner flex fd-c jc-c">
                        <h3>2XL</h3>
                        <h4>
                          <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL2} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                        </h4>
                      </div>
                      <div className="corner flex fd-c jc-c">
                        <h3>3XL</h3>
                        <h4>
                          <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL3} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                        </h4>
                      </div>
                      <div className="corner flex fd-c jc-c">
                        <h3>4XL</h3>
                        <h4>
                          <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL4} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                        </h4>
                      </div>
                      <div className="corner flex fd-c jc-c">
                        <h3>5XL</h3>
                        <h4>
                          <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL5} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </MediaQuery>
            </div>
            <MediaQuery maxWidth={479}>
              <div id={`price-box-wrapper-mobile-${i}`} className="price-box-wrapper-mobile" onClick={() => this.extendPriceMobile(i)}>
                <div id={`blue-arrow-mobile-${i}`} className="blue-arrow"></div>
                <label id={`blue-arrow-label-${i}`}>SEE MORE</label>
                <div className="flex">
                  <h1>Total: </h1>
                  <h2 className="left-space">
                    <NumberFormat value={order.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </h2>
                </div>
                <div className={`extended-sizes-wrapper-mobile flex jc-sb ${this.state.extended[i] ? 'active' : 'inactive'}`}>
                  <span>
                    <h3>XS-XL</h3>
                    <h2>
                      <NumberFormat value={order.totalPerShirt} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                    </h2>
                  </span>
                  <span>
                    <h3>2XL</h3>
                    <h2>
                      <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL2} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                    </h2>
                  </span>
                  <span>
                    <h3>3XL</h3>
                    <h2>
                      <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL3} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                    </h2>
                  </span>
                  <span>
                    <h3>4XL</h3>
                    <h2>
                      <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL4} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                    </h2>
                  </span>
                  <span>
                    <h3>5XL</h3>
                    <h2>
                      <NumberFormat value={Number(order.totalPerShirt) + order.sizeOffsets.XL5} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix={'ea'} />
                    </h2>
                  </span>
                </div>
              </div>
            </MediaQuery>
          </div>
        </div>
      );
    });

    return (
      <div id="Checkout">
        <h1 className="page-header">CHECKOUT</h1>
        <div id="cart-wrapper" className="flex">
          <div id="cart-wrapper-left">
            <div id="orders-in-cart">
              {items}
            </div>
            <hr id="section-line" />
            <MediaQuery minWidth={1310}>
              <div id="total-shipping-wrapper" className="flex">
                <div className="flex">
                  <div className="total-price">
                    <h1>Total + Shipping</h1>
                    <div className="flex number-format">
                      <NumberFormat value={orderTotal} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                      <h2>Plus Tax</h2>
                    </div>
                    <hr id="total-line" />
                  </div>
                  <div className="estimated-delivery flex fd-c jc-c">
                    <h1>Estimated Delivery:</h1>
                    <h2>{this.state.delivery}</h2>
                  </div>
                </div>
                <div className="checkout-buttons flex fd-c">
                  <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('buy-now', orderTotal)}>
                    <h1>BUY NOW</h1>
                    <img src={getAsset('buy-now-icon')} />
                  </button>
                  <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('bill-later', orderTotal)}>
                    <h1>BILL ME</h1>
                    <img src={getAsset('bill-me-icon')} />
                  </button>
                </div>
              </div>
            </MediaQuery>
            {this.state.error ? (
              <h1 className="error">{this.state.error}</h1>
            ) : null}
          </div>
          <div id="cart-wrapper-right">
            <h1>Contact Information</h1>
            <div className="form-section flex fw-w">
              <input type="text" name="email" placeholder="*Email" value={this.state.contact.email}
                onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="confirm" placeholder="*Confirm" value={this.state.contact.confirm}
                onChange={(e) => this.updateInput(e, 'contact')} />
              <input type="text" name="phone" placeholder="*Phone Number" value={this.state.contact.phone}
                onChange={(e) => this.updateInput(e, 'contact')} />
            </div>
            <h1>Billing Information</h1>
            <div className="form-section flex fw-w">
              <input type="text" name="first" placeholder="*First" value={this.state.billing.first}
                onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="last" placeholder="*Last" value={this.state.billing.last}
                onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="address" placeholder="*Address" value={this.state.billing.address}
                onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="city" placeholder="*City" value={this.state.billing.city}
                onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="state" placeholder="*State" value={this.state.billing.state}
                onChange={(e) => this.updateInput(e, 'billing')} />
              <input type="text" name="zip" placeholder="*Zip Code" value={this.state.billing.zip}
                onChange={(e) => this.updateInput(e, 'billing')} />
            </div>
            <span className="flex">
              <h1>Shipping Information</h1>
              <span className="same-as-billing flex ai-c" onClick={this.toggleSameAsBilling}>
                <img src={getAsset(this.state.shipping.sameAsBilling ? 'radio-filled' : 'radio-empty')} />
                <h2>SAME AS BILLING</h2>
              </span>
            </span>
            <div className="form-section flex fw-w">
              <input type="text" name="first" placeholder="*First" value={this.state.shipping.first}
                onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="last" placeholder="*Last" value={this.state.shipping.last}
                onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="address" placeholder="*Address" value={this.state.shipping.address}
                onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="city" placeholder="*City" value={this.state.shipping.city}
                onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="state" placeholder="*State" value={this.state.shipping.state}
                onChange={(e) => this.updateInput(e, 'shipping')} />
              <input type="text" name="zip" placeholder="*Zip Code" value={this.state.shipping.zip}
                onChange={(e) => this.updateInput(e, 'shipping')} />
            </div>
            <h1>Shipping Method</h1>
            <div id="shipping-method-wrapper">
              <div className="shipping-method flex ai-c" onClick={() => this.updateShippingMethod('ground')}>
                <h3>UPS GROUND</h3>
                {this.state.selectedShippingMethod === 'ground' ? <img src={getAsset('blue-check')} /> : <span></span>}
                <h3>*Guaranteed {deliveryOpts.ground.month}/{deliveryOpts.ground.day} (FREE)</h3>
              </div>
              <div className="shipping-method flex ai-c" onClick={() => this.updateShippingMethod('3-day')}>
                <h3>UPS 3-Day</h3>
                {this.state.selectedShippingMethod === '3-day' ? <img src={getAsset('blue-check')} /> : <span></span>}
                <h3>*Guaranteed {deliveryOpts.day3.month}/{deliveryOpts.day3.day} (+ $26)</h3>
              </div>
              <div className="shipping-method flex ai-c" onClick={() => this.updateShippingMethod('2-day')}>
                <h3>UPS 2-Day</h3>
                {this.state.selectedShippingMethod === '2-day' ? <img src={getAsset('blue-check')} /> : <span></span>}
                <h3>*Guaranteed {deliveryOpts.day2.month}/{deliveryOpts.day2.day} (+ $70)</h3>
              </div>
              <div className="shipping-method flex ai-c" onClick={() => this.updateShippingMethod('next-day')}>
                <h3>UPS Next Day</h3>
                {this.state.selectedShippingMethod === 'next-day' ? <img src={getAsset('blue-check')} /> : <span></span>}
                <h3>*Guaranteed {deliveryOpts.next.month}/{deliveryOpts.next.day} (+ $180)</h3>
              </div>
            </div>
          </div>
        </div>
        <MediaQuery maxWidth={1309} minWidth={640}>
          <div id="total-shipping-wrapper" className="flex">
            <div className="flex">
              <div className="total-price">
                <h1>Total + Shipping</h1>
                <div className="flex number-format">
                  <NumberFormat value={orderTotal} displayType={'text'}
                    thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  <h2>Plus Tax</h2>
                </div>
                <hr id="total-line" />
              </div>
              <div className="estimated-delivery flex fd-c jc-c">
                <h1>Estimated Delivery:</h1>
                <h2>{this.state.delivery}</h2>
              </div>
            </div>
            <div className="checkout-buttons flex fd-c">
              <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('buy-now', orderTotal)}>
                <h1>BUY NOW</h1>
                <img src={getAsset('buy-now-icon')} />
              </button>
              <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('bill-later', orderTotal)}>
                <h1>BILL ME</h1>
                <img src={getAsset('bill-me-icon')} />
              </button>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery maxWidth={639}>
          <div id="total-shipping-wrapper-mobile">
            <h1>Total + Shipping</h1>
            <div className="total-price">
              <div className="flex jc-c number-format">
                <NumberFormat value={orderTotal} displayType={'text'}
                  thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                <h2>Plus Tax</h2>
              </div>
              <hr id="total-line" />
            </div>
            <div className="checkout-buttons flex jc-sb">
              <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('buy-now', orderTotal)}>
                <h3>BUY NOW</h3>
                <img src={getAsset('buy-now-icon')} />
              </button>
              <div className="divider-margin"></div>
              <button className="flex ai-c jc-sb" onClick={() => this.sendOrder('bill-later', orderTotal)}>
                <h3>BILL ME</h3>
                <img src={getAsset('bill-me-icon')} />
              </button>
            </div>
          </div>
        </MediaQuery>
        <MediaQuery minWidth={700}>
          <div className="bottom-space"></div>
        </MediaQuery>
        <div className="button-desc-wrapper flex">
          <div className="button-desc">
            <h1>*BILL ME LATER</h1>
            <p>
              This option is only availible for orders over the amount
              of $500, upon submiting our account specialists will
              discuss payment options.
            </p>
          </div>
          <div className="divider-margin"></div>
          <div className="button-desc">
            <h1>*BUY NOW</h1>
            <p>
              Upon submitting, your card will be authorized but will
              not be charged until the order has been shipped.
            </p>
          </div>
        </div>
        <div className="bottom-space"></div>
        {this.state.paymentModal ? (
          <Processor total={orderTotal} orders={orders} billing={this.state.billing}
            shipping={this.state.shipping} contact={this.state.contact}
            first={this.state.billing.first} last={this.state.billing.last} toggle={this.toggle} />
        ) : null}
        <WaitIndicator message="Placing your order..." waiting={this.state.waiting} />
        <MainFooter />
      </div>
    );
  }
}

Checkout.prototype.buildCardSubHeader = methods.buildCardSubHeader;
Checkout.prototype.updOrder = methods.updOrder;
Checkout.prototype.calculateCost = methods.calculateCost;
Checkout.prototype.setProduct = methods.setProduct;
Checkout.prototype.removeOrder = methods.removeOrder;
Checkout.prototype.extendPrice = methods.extendPrice;
Checkout.prototype.extendPriceMobile = methods.extendPriceMobile;
Checkout.prototype.updateInput = methods.updateInput;
Checkout.prototype.toggleSameAsBilling = methods.toggleSameAsBilling;
Checkout.prototype.updateShippingMethod = methods.updateShippingMethod;
Checkout.prototype.sendOrder = methods.sendOrder;
Checkout.prototype.prepareAttachments = methods.prepareAttachments;
Checkout.prototype.toggle = toggle;

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = {
  removeOrder: removeOrder,
  initializeBuilder: initializeBuilder
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));
