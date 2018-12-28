import React, { Component } from 'react';
import { getAsset } from '../../modules';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import MediaQuery from 'react-responsive';
import SizeForm from '../../components/SizeForm';
import MainFooter from '../../components/MainFooter';
import SwipeableViews from 'react-swipeable-views';
import * as methods from './methods';
import { scrollToTop } from '../../modules';
import axios from 'axios';
import './style.scss';

class Cart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      guid: getQueryParams(window.location.search).guid,
      orders: [],
      details: {},
      shownSide: 0,
      selected: 0,
      extended: undefined
    }
    this.toggleShownSide = this.toggleShownSide.bind(this);
    this.buildCardSubHeader = this.buildCardSubHeader.bind(this);
    this.selectOrder = this.selectOrder.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.extendPrice = this.extendPrice.bind(this);
  }

  componentDidMount() {
    scrollToTop();
    axios.get(`/api/order/${this.state.guid}`)
    .then((response) => {
      let extended = response.data.orders.map((o) => false);
      this.setState({orders: response.data.orders, details: response.data.details, extended: extended});
    })
  }

  render() {

    let orderTotal = 0;
    let orders = this.state.orders;
    let delivery = this.state.details.delivery;
    let display = orders.length ? true : false;

    let items = orders.map((order, i) => {
      order.sizeOffsets = this.calculateCost(order).sizeOffsets;
      let locationText = this.buildCardSubHeader(order);
      orderTotal += Number(order.total);
      return (
        <div key={i} className="order flex ai-c jc-sb">
          <i className="fas fa-arrow-right" style={this.state.selected === i ? {
            "color": "#44B1DE"
          } : null}></i>
          <div className="sizes-card" onClick={() => this.selectOrder(i)}>
            <div className="flex card-header">
              <h1 className="brand-header">{order.product.brand} {order.product.number}</h1>
              <span>-</span><h1 className="color-header">{order.selectedColor}</h1>
            </div>
            <h1 className="location-header">{locationText}</h1>
            <div className="sizes-price flex">
              <MediaQuery minWidth={690}>
                <SizeForm form={order} size="medium" />
              </MediaQuery>
              <MediaQuery maxWidth={689}>
                <SizeForm form={order} size="small" />
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
              <div className="price-box-wrapper-mobile flex jc-sb">
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
            </MediaQuery>
          </div>
        </div>
      );
    });

    return (
      <div id="Cart">
        <div className="page-nav flex jc-sb">
          <h1 className="page-header">Quote #: {this.state.details.orderNumber}</h1>
        </div>
        <MediaQuery maxWidth={489}>
          <div className="swipe-guide flex jc-c ai-c">
            <i className="fas fa-arrow-left"></i>
            <h1>{this.state.shownSide ? 'Back' : 'Front'}</h1>
            <i className="fas fa-arrow-right"></i>
          </div>
        </MediaQuery>
        <div id="cart-wrapper" className="flex">
          <div id="cart-wrapper-left">
            <div id="orders-in-cart">
              {items}
            </div>
            <hr id="section-line" />
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
                  <h2>{delivery}</h2>
                </div>
              </div>
              <div className="button-fake flex jc-c ai-c fd-c">
                <img src={getAsset('white-check-circle')} />
              </div>
            </div>
          </div>
          {orders.length ? (
            <div id="cart-wrapper-right">
              <MediaQuery minWidth={490}>
                <div id="side-buttons" className="flex fd-c">
                  <span className={!this.state.shownSide ? "side-button active" : "side-button"}>
                    <span onClick={() => this.toggleShownSide()}>
                      <img src={getAsset('front-side-button')} />
                      <h1>FRONT</h1>
                    </span>
                  </span>
                  <span className={this.state.shownSide ? "side-button active" : "side-button"}>
                    <span onClick={() => this.toggleShownSide()}>
                      <img src={getAsset('back-side-button')} />
                      <h1>BACK</h1>
                    </span>
                  </span>
                </div>
              </MediaQuery>
              <MediaQuery minWidth={490}>
                <div id="mockup-wrapper">
                  {!this.state.shownSide ? (
                    <img src={display ? orders[this.state.selected].mockup[0] : ''} />
                  ) : (
                    <img src={display ? orders[this.state.selected].mockup[1] : ''} />
                  )}
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={489}>
                <SwipeableViews resistance onChangeIndex={this.toggleShownSide}>
                  <div id="mockup-wrapper-front">
                    <img src={orders[this.state.selected].mockup[0]} />
                  </div>
                  <div id="mockup-wrapper-back">
                    <img src={orders[this.state.selected].mockup[1]} />
                  </div>
                </SwipeableViews>
              </MediaQuery>
            </div>
          ) : null}
        </div>
        <div className="bottom-space"></div>
        <MainFooter />
      </div>
    );
  }
}

Cart.prototype.toggleShownSide = methods.toggleShownSide;
Cart.prototype.buildCardSubHeader = methods.buildCardSubHeader;
Cart.prototype.selectOrder = methods.selectOrder;
Cart.prototype.calculateCost = methods.calculateCost;
Cart.prototype.extendPrice = methods.extendPrice;

const mapStateToProps = (state) => {
  return {
    cart: state.cart
  }
}

function getQueryParams(str) {
  let queries = str.substring(1).split('&');
  let params = {};
  queries.forEach((q) => {
    let parts = q.split('=');
    params[parts[0]] = parts[1];
  });
  return params;
}

export default withRouter(connect(mapStateToProps)(Cart));
