import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setModal, addImage } from '../../reducers/modal';
import { setColor, toggleType, updateSize, 
  toggleLoc, dec, inc, resetProduct } from '../../reducers/product';
import { add } from '../../reducers/cart';
import Mockup from '../Mockup/Mockup';
import radioFilled from '../../src/radio-filled.svg';
import radioEmpty from '../../src/radio-empty.svg';
import closeButton from '../../src/close-button.svg';
import './ProductModal.scss';

function format0s(value) {
  var zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
}

class ProductModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delivery: 'September 29',
      XS: this.props.product.XS,
      SM: this.props.product.SM,
      M: this.props.product.M,
      L: this.props.product.L,
      XL: this.props.product.XL,
      XL2: this.props.product.XL2,
      XL3: this.props.product.XL3,
      XL4: this.props.product.XL4,
      input: ''
    }
    this.updateSize = this.updateSize.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.openLocal = this.openLocal.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", (e) => {
      if (this.props.modal.open) {
        if (e.target.nodeName !== 'INPUT') {
          if (this.state.input && this.state[this.state.input]) {
            this.formatSize(this.state[this.state.input], this.state.input);
            var newState = Object.assign({}, this.state);
            newState.input = '';
            this.setState(newState);
          }
        } else {
          var newState = Object.assign({}, this.state);
          newState.input = e.target.name;
          this.setState(newState);
        }
      }
    });
  }

  updateSize(e, size) {
    var newState = Object.assign({}, this.state);
    newState[size] = e.target.value;
    this.setState(newState);
    this.props.updateSize(size, e.target.value);
  }

  formatSize(quantity, size) {
    var newState = Object.assign({}, this.state);
    newState[size] = format0s(quantity);
    this.setState(newState);
    this.props.updateSize(size, format0s(quantity));
  }

  openLocal() {
    document.getElementById('inputButton').click();
  }

  storeFile(e) {
    var reader = new FileReader();
    reader.onloadend = () => {
      this.props.addImage(reader.result);
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
  }

  addToCart() {
    this.props.add(this.props.product);
    this.props.setModal(false);
  }

  render() {

    var colors = this.props.product.colors.map((color, i) => {
      return (
        <div className="color" key={i} style={this.props.product.color === color ? {
          border: 'solid 3px #44B1DE', background: color} : {background: color}}
          onClick={() => this.props.setColor(color)}>
        </div>
      )
    });

    return (
      <div className="ProductModal">
        <div className="backdrop"
          onClick={() => {this.props.setModal(false); this.props.resetProduct()}}>
        </div>
        <div className="modal">
          <div className="column">
            <h1>{this.props.product.brand.toUpperCase()}</h1>
            <h1>{this.props.product.number}</h1>
            <p>{this.props.product.description}</p>
            <div className="colors">
              {colors}
            </div>
            <div className="print-type">
              <div className="radio-button">
                <img src={this.props.product.isScreen ? (radioFilled):
                (radioEmpty)} onClick={this.props.toggleType} /> Screen Print
              </div>
              <div className="radio-button">
              <img src={!this.props.product.isScreen ? (radioFilled):
                (radioEmpty)} onClick={this.props.toggleType} /> Embroidery
              </div>
            </div>
            <div className="sizes">
              <div className="size">
                <h3>Size</h3>
                <h2>XS</h2>
                <h2>SM</h2>
                <h2>M</h2>
                <h2>L</h2>
                <h2>XL</h2>
                <h2>2XL</h2>
                <h2>3XL</h2>
                <h2>4XL</h2>
              </div>
              <div className="quantity">
                <h3>Quantity</h3>
                <input type="text" value={this.state.XS} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'XS')} name="XS" />
                <input type="text" value={this.state.SM} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'SM')} name="SM" />
                <input type="text" value={this.state.M} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'M')} name="M" />
                <input type="text" value={this.state.L} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'L')} name="L" />
                <input type="text" value={this.state.XL} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'XL')} name="XL" />
                <input type="text" value={this.state.XL2} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'XL2')} name="XL2" />
                <input type="text" value={this.state.XL3} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'XL3')} name="XL3" />
                <input type="text" value={this.state.XL4} placeholder="000"
                  onChange={(e) => this.updateSize(e, 'XL4')} name="XL4" />
              </div>
            </div>
            <div className="locations">
              <div className="location">
                <h3>Location</h3>
                <div className="radio-button">
                  <img src={this.props.product.front ? (radioFilled):
                  (radioEmpty)} onClick={() => this.props.toggleLoc('front')} /> Front
                </div>
                <div className="radio-button">
                  <img src={this.props.product.back ? (radioFilled):
                  (radioEmpty)} onClick={() => this.props.toggleLoc('back')} /> Back
                </div>
                <div className="radio-button">
                  <img src={this.props.product.bottom ? (radioFilled):
                  (radioEmpty)} onClick={() => this.props.toggleLoc('bottom')} /> Bottom
                </div>
                <div className="radio-button">
                  <img src={this.props.product.leftSleeve ? (radioFilled):
                  (radioEmpty)} onClick={() => this.props.toggleLoc('leftSleeve')} /> Left Sleeve
                </div>
                <div className="radio-button">
                  <img src={this.props.product.rightSleeve ? (radioFilled):
                  (radioEmpty)} onClick={() => this.props.toggleLoc('rightSleeve')} /> Right Sleeve
                </div>
              </div>
              <div className="color-count">
                <h3>Color</h3>
                <div className="count">
                  <button onClick={() => this.props.dec('colorFront')}>-</button>
                  {this.props.product.colorFront}
                  <button onClick={() => this.props.inc('colorFront')}>+</button>
                </div>
                <div className="count">
                  <button onClick={() => this.props.dec('colorBack')}>-</button>
                  {this.props.product.colorBack}
                  <button onClick={() => this.props.inc('colorBack')}>+</button>
                </div>
                <div className="count">
                  <button onClick={() => this.props.dec('colorBottom')}>-</button>
                  {this.props.product.colorBottom}
                  <button onClick={() => this.props.inc('colorBottom')}>+</button>
                </div>
                <div className="count">
                  <button onClick={() => this.props.dec('colorLeftSleeve')}>-</button>
                  {this.props.product.colorLeftSleeve}
                  <button onClick={() => this.props.inc('colorLeftSleeve')}>+</button>
                </div>
                <div className="count">
                  <button onClick={() => this.props.dec('colorRightSleeve')}>-</button>
                  {this.props.product.colorRightSleeve}
                  <button onClick={() => this.props.inc('colorRightSleeve')}>+</button>
                </div>
              </div>
            </div>
            <div className="totals">
                <h3>Est. Subtotal:</h3>
                <h2>${this.props.product.subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h2>
              </div>
              <div className="totals">
                <h3>Est. Delivery:</h3>
                <h2>{this.state.delivery}</h2>
              </div>
          </div>
          <div className="column">
            <Mockup />
            <div className="mockup-options">
              <div className="upload-photo">
                <input id="inputButton" type="file"
                  accept="image/x-png,image/jpeg"
                  onChange={this.storeFile} />
                <button onClick={this.openLocal}>+ Upload Artwork</button>
              </div>
              <button>Download Mockup</button>
            </div>
            <button className="add-quote" onClick={this.addToCart}>Add to Quote Submission</button>
          </div>
          <img className="close-button" src={closeButton}
            onClick={() => {this.props.setModal(false); this.props.resetProduct()}} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product,
    modal: state.modal
  }
}

const mapDispatchToProps = {
  setColor: setColor,
  toggleType: toggleType,
  updateSize: updateSize,
  toggleLoc: toggleLoc,
  dec: dec,
  inc: inc,
  setModal: setModal,
  resetProduct: resetProduct,
  addImage: addImage,
  add: add
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
