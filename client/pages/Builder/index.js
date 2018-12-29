import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import SwipeableViews from 'react-swipeable-views';
import { getAsset, toggle, setDelivery, scrollToTop } from '../../modules';
import * as methods from './methods';
import ColorUpdater from '../../components/ColorUpdater';
import SizeForm from '../../components/SizeForm';
import PrintArea from '../../components/PrintArea';
import WaitIndicator from '../../components/WaitIndicator';
import MainFooter from '../../components/MainFooter';
import MediaQuery from 'react-responsive';
import { addOrder, updOrder } from '../../reducers/cart';
import './style.scss';

class Builder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.builder ? props.builder.product : undefined,
      selectedColor: props.builder ? props.builder.selectedColor : undefined,
      selectedHex: props.builder ? props.builder.selectedHex : undefined,
      quantity: props.builder ? props.builder.quantity : 1,
      frontColors: props.builder ? props.builder.frontColors : 0,
      backColors: props.builder ? props.builder.backColors : 0,
      leftSleeveColors: props.builder ? props.builder.leftSleeveColors : 0,
      rightSleeveColors: props.builder ? props.builder.rightSleeveColors : 0,
      foldedAndBagged: false,
      insideTagPrinting: false,
      total: 0,
      totalPerShirt: 0,
      shownSide: 0,
      addOns: true,
      waiting: false,
      waiting2: false,
      dragging: false,
      front: true,
      guid: props.builder ? props.builder.guid : undefined,
      help: false,
      zip: props.builder ? props.builder.zip : '',
      rates: !!(props.builder && props.builder.rates) ? props.builder.rates : [],
      showZip: !!(props.builder && props.builder.zip) ? false : true,
      edit: props.builder ? props.builder.edit : false,
      uploaded: props.builder && props.builder.uploaded ? props.builder.uploaded : { front: [], back: [] },
      XS: props.builder && props.builder.XS ? props.builder.XS : "",
      S: props.builder && props.builder.S ? props.builder.S : "",
      M: props.builder && props.builder.M ? props.builder.M : "",
      L: props.builder && props.builder.L ? props.builder.L : "",
      XL: props.builder && props.builder.XL ? props.builder.XL : "",
      XL2: props.builder && props.builder.XL2 ? props.builder.XL2 : "",
      XL3: props.builder && props.builder.XL3 ? props.builder.XL3 : "",
      XL4: props.builder && props.builder.XL4 ? props.builder.XL4 : "",
      XL5: props.builder && props.builder.XL5 ? props.builder.XL5 : "",
      sizeOffsets: {
        XL2: 0,
        XL3: 0,
        XL4: 0,
        XL5: 0
      },
      errMsg: ''
    }
    this.selectColor = this.selectColor.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.validateQuantity = this.validateQuantity.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.incrimentColor = this.incrimentColor.bind(this);
    this.decrimentColor = this.decrimentColor.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.toggleShownSide = this.toggleShownSide.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.updateToCart = this.updateToCart.bind(this);
    this.setZip = this.setZip.bind(this);
    this.toggle = this.toggle.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  componentDidMount() {
    scrollToTop();
    if (this.state.product) {
      this.calculateCost(this.state, 0);
    }
    let input = document.getElementById('zip-input');
    if (input) {
      input.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 && e.which === 13) {
          this.getRates();
        }
      });
    }
    if (this.state.zip) this.getRates();
  }

  componentWillMount() {
    if (!this.props.builder || !this.props.builder.product) {
      this.props.history.push('/products');
    }
  }

  render() {

    if (!this.props.builder || !this.props.builder.product) {
      return <div></div>;
    }

    let build = this.props.builder;
    let product = this.props.builder.product;
    let delivery = setDelivery(4);

    let colors = product.colors.map((color, i) => {
      return (
        <span className={color.name === this.state.selectedColor ? 'active circle flex' : 'circle flex'} key={i} onClick={() => this.selectColor(color)}>
          <span className="color-circle flex jc-c ai-c" style={{background: color.hex}}>
            {color.name === this.state.selectedColor ? (
              <img src={getAsset('checkmark')} />
            ) : null}
          </span>
        </span>
      );
    });

    return (
      <div id="Builder">
        <div className="page-nav flex jc-sb">
          <MediaQuery minWidth={690}>
            <h1 className="page-header">PRODUCT BUILDER</h1>
          </MediaQuery>
          {!this.state.waiting2 && !this.state.showZip ? (
            <MediaQuery minWidth={690}>
              <div className="flex page-nav-right">
                {this.state.errMsg ? (
                  <h1>{this.state.errMsg}</h1>
                ) : null}
                {this.state.edit ? (
                  <button className="add-to-cart-button" onClick={this.updateToCart}>SAVE ORDER</button>
                ) : (
                  <button className="add-to-cart-button" onClick={this.addToCart}>ADD TO CART</button>
                )}
              </div>
            </MediaQuery>
          ) : null}
          <MediaQuery maxWidth={689}>
            <h2>{product.brand} {product.number}</h2>
          </MediaQuery>
          <MediaQuery maxWidth={689}>
            <div className="swipe-guide flex jc-c ai-c">
              <i className="fas fa-arrow-left"></i>
              <h1>{this.state.front ? 'Front' : 'Back'}</h1>
              <i className="fas fa-arrow-right"></i>
            </div>
          </MediaQuery>
        </div>
        <div id="builder-wrapper" className="flex">
          <div id="builder-wrapper-left">
            <MediaQuery minWidth={690}>
              <h1 className="h-wrapper">
                <span className="brand-header">{product.brand}</span>
                <span className="brand-number"> - {product.number}</span>
              </h1>
            </MediaQuery>
            <MediaQuery minWidth={690}>
              <h2 className="h-wrapper">
                <span className="desc-section">
                  <span className="desc-header">Quality:</span>
                  <span>{product.quality}</span>
                </span>
                <span className="desc-section">
                  <span className="desc-header">Material:</span>
                  <span>{product.material}</span>
                </span>
                <span className="desc-section">
                  <span className="desc-header">Our Rating:</span>
                  <span>{product.rating}/10</span>
                </span>
              </h2>
            </MediaQuery>
            <h3 className="h-wrapper">
              <span className="color-header">Color:</span>
              <span className="color-selected">{this.state.selectedColor}</span>
            </h3>
            <div id="colors-wrapper" className="flex">
              {colors}
            </div>
            <MediaQuery maxWidth={689}>
              <div className="description-mobile">
                <h3>PRODUCT DESCRIPTION</h3>
                <hr />
                <div className="desc-section-wrapper flex jc-sb fw-w">
                  <span className="desc-section">
                    <span className="desc-header">Quality:</span>
                    <span>{product.quality}</span>
                  </span>
                  <span className="desc-section">
                    <span className="desc-header">Material:</span>
                    <span>{product.material}</span>
                  </span>
                  <span className="desc-section">
                    <span className="desc-header">Our Rating:</span>
                    <span>{product.rating}/10</span>
                  </span>
                </div>
                <h3>ORDER DETAILS</h3>
              </div>
            </MediaQuery>
            <hr />
            <h4 className="h-wrapper">
              <span className="quantity-header">Quantity:</span>
              <input id="qty-input" type="text" onChange={this.updateQuantity} defaultValue={
                this.state.quantity ? this.state.quantity : 30
              } placeholder="30" onBlur={this.validateQuantity} />
            </h4>
            <div id="color-updater-wrapper" className="flex fw-w">
              <ColorUpdater label="Front" location="front" numColors={this.state.frontColors}
                decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
              <ColorUpdater label="Back" location="back" numColors={this.state.backColors}
                decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
              <ColorUpdater label="Left Sleeve" location="leftSleeve" numColors={this.state.leftSleeveColors}
                decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
              <ColorUpdater label="Right Sleeve" location="rightSleeve" numColors={this.state.rightSleeveColors}
                decrimentColor={this.decrimentColor} incrimentColor={this.incrimentColor} />
            </div>
            <hr />
            <h5 className="section-h">Sizing:</h5>
            <MediaQuery minWidth={550}>
              <SizeForm edit={true} form={this.state} updateSize={this.updateSize} size="large" />
            </MediaQuery>
            <MediaQuery maxWidth={549}>
              <SizeForm edit={true} form={this.state} updateSize={this.updateSize} size="medium" />
            </MediaQuery>
            <hr />
            <h5 className="section-h">Total:</h5>
            {this.state.showZip || !this.state.rates.length ? (
              <div id="zip-section-wrapper" className="flex fd-c jc-c ai-c">
                <h1>WHERE WILL THIS BE SHIPPED?</h1>
                <div className="ship-buttons flex jc-c">
                  <input id="zip-input" className="zip-input" type="text" placeholder="ZIP CODE" onChange={this.setZip} />
                  <button className="ok-button" onClick={this.getRates}>OK</button>
                </div>
              </div>
            ) : (
              <div id="total-section-wrapper" className="flex jc-sa">
                <div id="total-left-section">
                  <h1>Cost Per Item:</h1>
                  <div className="flex">
                    <h3>XS-XL</h3>
                    <h2>
                      <NumberFormat value={this.state.totalPerShirt} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix="ea" />
                    </h2>
                  </div>
                  <div className="flex jc-sb">
                    <h4>2XL <span className="format-wrapper">
                      <NumberFormat value={Number(this.state.totalPerShirt) + this.state.sizeOffsets.XL2} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix="ea" />
                    </span></h4>
                    <h4>3XL <span className="format-wrapper">
                      <NumberFormat value={Number(this.state.totalPerShirt) + this.state.sizeOffsets.XL3} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix="ea" />
                    </span></h4>
                  </div>
                  <div className="flex jc-sb">
                    <h4>4XL <span className="format-wrapper">
                      <NumberFormat value={Number(this.state.totalPerShirt) + this.state.sizeOffsets.XL4} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix="ea" />
                    </span></h4>
                    <h4>5XL <span className="format-wrapper">
                      <NumberFormat value={Number(this.state.totalPerShirt) + this.state.sizeOffsets.XL5} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} suffix="ea" />
                    </span></h4>
                  </div>
                </div>
                <div id="total-right-section">
                  <h1>Total + Free Shipping:</h1>
                  <h2>
                    <NumberFormat value={this.state.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} fixedDecimalScale={true} />
                  </h2>
                  <h5>Estimated Delivery:</h5>
                  <h6>{delivery}</h6>
                </div>
              </div>
            )}
            <MediaQuery maxWidth={689}>
              <hr />
            </MediaQuery>
            {!this.state.waiting2 && !this.state.showZip ? (
              <MediaQuery maxWidth={689}>
                <div className="add-to-cart-button-wrapper">
                  {this.state.errMsg ? (
                    <h1>{this.state.errMsg}</h1>
                  ) : null}
                  {this.state.edit ? (
                    <button className="add-to-cart-button" onClick={this.updateToCart}>SAVE ORDER</button>
                  ) : (
                    <button className="add-to-cart-button" onClick={this.addToCart}>ADD TO CART</button>
                  )}
                </div>
              </MediaQuery>
            ) : null}
          </div>
          <div id="builder-wrapper-right">
            <MediaQuery minWidth={690}>
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
            <div id="add-logo-button">
              <span onClick={() => document.getElementById('inputButton').click()} className="flex fd-c ai-c">
                <i className="fas fa-plus-circle"></i>
                <h1>ADD LOGO</h1>
              </span>
              <input id="inputButton" type="file" accept="image/x-png,image/jpeg" onChange={this.storeFile} />
            </div>
            <MediaQuery maxWidth={689}>
              <SwipeableViews resistance disabled={this.state.dragging} onChangeIndex={() => {this.toggle('front'); this.toggleShownSide()}}>
                <div className="product-image-wrapper flex jc-c"
                  style={this.state.shownSide ? {"zIndex": 0} : {"zIndex": 1}}>
                  <div id="front-side">
                    <img src={this.state.product.images[this.state.selectedHex][0]} />
                    <PrintArea uploaded={this.state.uploaded.front} removeImage={this.removeImage} printArea={this.state.product.printArea[1]}
                      saveEdits={this.saveEdits} side="front" toggle={this.toggle} dragging={this.state.dragging} />
                  </div>
                </div>
                <div className="product-image-wrapper flex jc-c"
                  style={this.state.shownSide ? {"zIndex": 1} : {"zIndex": 0}}>
                  <div id="back-side">
                    <img src={this.state.product.images[this.state.selectedHex][1]} />
                    <PrintArea uploaded={this.state.uploaded.back} removeImage={this.removeImage} printArea={this.state.product.printArea[0]}
                      saveEdits={this.saveEdits} side="back" toggle={this.toggle} dragging={this.state.dragging} />
                  </div>
                </div>
              </SwipeableViews>
            </MediaQuery>
            <MediaQuery minWidth={690}>
              <div className="non-swipe">
                <div className="product-image-wrapper flex jc-c"
                  style={this.state.shownSide ? {"zIndex": 1} : {"zIndex": 0}}>
                  <div id="back-side">
                    <img src={this.state.product.images[this.state.selectedHex][1]} />
                    <PrintArea uploaded={this.state.uploaded.back} removeImage={this.removeImage} printArea={this.state.product.printArea[1]}
                      saveEdits={this.saveEdits} side="back" toggle={this.toggle} dragging={this.state.dragging} />
                  </div>
                </div>
                <div className="product-image-wrapper flex jc-c"
                  style={this.state.shownSide ? {"zIndex": 0} : {"zIndex": 1}}>
                  <div id="front-side">
                    <img src={this.state.product.images[this.state.selectedHex][0]} />
                    <PrintArea uploaded={this.state.uploaded.front} removeImage={this.removeImage} printArea={this.state.product.printArea[0]}
                      saveEdits={this.saveEdits} side="front" toggle={this.toggle} dragging={this.state.dragging} />
                  </div>
                </div>
              </div>
            </MediaQuery>
          </div>
        </div>
        <MediaQuery minWidth={690}>
          <div className="bottom-space"></div>
        </MediaQuery>
        <WaitIndicator message="Preparing your cart..." waiting={this.state.waiting} />
        <WaitIndicator message="Retrieving shipment information..." waiting={this.state.waiting2} />
        <MainFooter />
      </div>
    );
  }
}

Builder.prototype.selectColor = methods.selectColor;
Builder.prototype.updateQuantity = methods.updateQuantity;
Builder.prototype.validateQuantity = methods.validateQuantity;
Builder.prototype.calculateCost = methods.calculateCost;
Builder.prototype.incrimentColor = methods.incrimentColor;
Builder.prototype.decrimentColor = methods.decrimentColor;
Builder.prototype.updateSize = methods.updateSize;
Builder.prototype.toggleShownSide = methods.toggleShownSide;
Builder.prototype.storeFile = methods.storeFile;
Builder.prototype.uploadImage = methods.uploadImage;
Builder.prototype.saveEdits = methods.saveEdits;
Builder.prototype.removeImage = methods.removeImage;
Builder.prototype.addToCart = methods.addToCart;
Builder.prototype.updateToCart = methods.updateToCart;
Builder.prototype.setZip = methods.setZip;
Builder.prototype.getRates = methods.getRates;
Builder.prototype.toggle = toggle;

const mapStateToProps = (state) => {
  return {
    builder: state.builder
  }
}

const mapDispatchToProps = {
  addOrder: addOrder,
  updOrder: updOrder
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Builder));
