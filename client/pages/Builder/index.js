import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import NumberFormat from 'react-number-format';
import SwipeableViews from 'react-swipeable-views';
import { getAsset, toggle, setFooter } from '../../modules';
import * as methods from './methods';
import ColorUpdater from '../../components/ColorUpdater';
import SizeForm from '../../components/SizeForm';
import PrintArea from '../../components/PrintArea';
import WaitIndicator from '../../components/WaitIndicator';
import { addOrder, updOrder } from '../../reducers/cart';
import './style.scss';

class Builder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.builder.product ? props.builder.product : undefined,
      selectedColor: props.builder.product ? props.builder.product.colors[0].name : undefined,
      selectedHex: props.builder.product ? props.builder.product.colors[0].hex : undefined,
      quantity: props.builder.build ? props.builder.build.quantity : 1,
      frontColors: props.builder.build ? props.builder.build.frontColors : 0,
      backColors: props.builder.build ? props.builder.build.backColors : 0,
      leftSleeveColors: props.builder.build ? props.builder.build.leftSleeveColors : 0,
      rightSleeveColors: props.builder.build ? props.builder.build.rightSleeveColors : 0,
      foldedAndBagged: false,
      insideTagPrinting: false,
      total: 0,
      totalPerShirt: 0,
      delivery: this.setDelivery(),
      shownSide: 0,
      addOns: true,
      waiting: false,
      dragging: false,
      front: true,
      help: false,
      zip: '',
      showZip: true,
      edit: false,
      uploaded: {
        front: [],
        back: []
      },
      XS: "",
      S: "",
      M: "",
      L: "",
      XL: "",
      XL2: "",
      XL3: "",
      XL4: "",
      XL5: ""
    }
    this.selectColor = this.selectColor.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.calculateCost = this.calculateCost.bind(this);
    this.incrimentColor = this.incrimentColor.bind(this);
    this.decrimentColor = this.decrimentColor.bind(this);
    this.updateSize = this.updateSize.bind(this);
    this.setDelivery = this.setDelivery.bind(this);
    this.toggleShownSide = this.toggleShownSide.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    if (this.state.product) this.calculateCost();
    setFooter('MainFooter');
  }

  componentWillMount() {
    if (!this.props.builder.build || !this.props.builder.product) {
      this.props.history.push('/products');
    }
  }

  componentDidUpdate() {
    setFooter('MainFooter');
  }

  render() {

    if (!this.props.builder.build || !this.props.builder.product) {
      return <div></div>;
    }

    let build = this.props.builder.build;
    let product = this.props.builder.product;

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
          <h1 className="page-header">PRODUCT BUILDER</h1>
          {this.state.edit ? (
            <button onClick={this.updateToCart}>SAVE ORDER</button>
          ) : (
            <button onClick={this.addToCart}>ADD TO CART</button>
          )}
        </div>
        <div id="builder-wrapper" className="flex">
          <div id="builder-wrapper-left">
            <h1 className="h-wrapper">
              <span className="brand-header">{product.brand}</span>
              <span className="brand-number"> - {product.number}</span>
            </h1>
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
            <h3 className="h-wrapper">
              <span className="color-header">Color:</span>
              <span className="color-selected">{this.state.selectedColor}</span>
            </h3>
            <div id="colors-wrapper" className="flex">
              {colors}
            </div>
            <hr />
            <h4 className="h-wrapper">
              <span className="quantity-header">Quantity:</span>
              <input type="text" value={this.state.quantity} onChange={this.updateQuantity} />
            </h4>
            <div id="color-updater-wrapper" className="flex">
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
            <SizeForm form={this.state} updateSize={this.updateSize} />
            <hr />
            <h5 className="section-h">Total:</h5>
            {this.state.showZip ? (
              <div id="zip-section-wrapper" className="flex fd-c jc-c ai-c">
                <h1>WHERE WILL THIS BE SHIPPED?</h1>
                <div className="ship-buttons flex jc-c">
                  <input className="zip-input" type="text" placeholder="ZIP CODE" onChange={this.setZip} />
                  <button className="ok-button" onClick={() => this.toggle('showZip')}>OK</button>
                </div>
              </div>
            ) : (
              <div id="total-section-wrapper" className="flex jc-sa">
                <div id="total-left-section">
                  <h1>Price Per Shirt:</h1>
                  <div className="flex">
                    <h2>
                      <NumberFormat value={this.state.totalPerShirt} displayType={'text'}
                        thousandSeparator={true} prefix={'$'} decimalScale={2} />
                    </h2>
                    <h3>/ Shirt</h3>
                  </div>
                  <div className="flex jc-sb">
                    <h4>2XL - $2.50 more.</h4>
                    <h4>3XL - $3.50 more.</h4>
                  </div>
                </div>
                <div id="total-right-section">
                  <h1>Total + Free Shipping:</h1>
                  <h2>
                    <NumberFormat value={this.state.total} displayType={'text'}
                      thousandSeparator={true} prefix={'$'} decimalScale={2} />
                  </h2>
                  <h5>Estimated Delivery:</h5>
                  <h6>{this.state.delivery}</h6>
                </div>
              </div>
            )}
          </div>
          <div id="builder-wrapper-right">
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
            <div id="add-logo-button">
              <span onClick={() => document.getElementById('inputButton').click()} className="flex fd-c ai-c">
                <i className="fas fa-plus-circle"></i>
                <h1>ADD LOGO</h1>
              </span>
              <input id="inputButton" type="file" accept="image/x-png,image/jpeg" onChange={this.storeFile} />
            </div>
            <div className="non-swipe">
              <div className="product-image-wrapper flex jc-c"
                style={this.state.shownSide ? {"zIndex": 1} : {"zIndex": 0}}>
                <div id="back-side">
                  <img src={this.state.product.images[this.state.selectedHex][1]} />
                  <PrintArea uploaded={this.state.uploaded.back} removeImage={this.removeImage} printArea={this.state.product.printArea}
                    saveEdits={this.saveEdits} side="back" toggle={this.toggle} dragging={this.state.dragging} />
                </div>
              </div>
              <div className="product-image-wrapper flex jc-c"
                style={this.state.shownSide ? {"zIndex": 0} : {"zIndex": 1}}>
                <div id="front-side">
                  <img src={this.state.product.images[this.state.selectedHex][0]} />
                  <PrintArea uploaded={this.state.uploaded.front} removeImage={this.removeImage} printArea={this.state.product.printArea}
                    saveEdits={this.saveEdits} side="front" toggle={this.toggle} dragging={this.state.dragging} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-space"></div>
        <WaitIndicator message="Preparing your cart..." waiting={this.state.waiting} />
      </div>
    );
  }
}

Builder.prototype.selectColor = methods.selectColor;
Builder.prototype.updateQuantity = methods.updateQuantity;
Builder.prototype.calculateCost = methods.calculateCost;
Builder.prototype.incrimentColor = methods.incrimentColor;
Builder.prototype.decrimentColor = methods.decrimentColor;
Builder.prototype.updateSize = methods.updateSize;
Builder.prototype.setDelivery = methods.setDelivery;
Builder.prototype.toggleShownSide = methods.toggleShownSide;
Builder.prototype.storeFile = methods.storeFile;
Builder.prototype.uploadImage = methods.uploadImage;
Builder.prototype.saveEdits = methods.saveEdits;
Builder.prototype.removeImage = methods.removeImage;
Builder.prototype.addToCart = methods.addToCart;
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
