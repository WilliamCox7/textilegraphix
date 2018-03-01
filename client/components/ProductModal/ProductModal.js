import { React, Component, connect, html2canvas, moment } from '../../packages';
import { Mockup } from '../components';
import { setModal } from '../../reducers/modal';
import { setColor, toggleType, updateSize, toggleLoc, dec, inc, resetProduct, addImage, setTitles } from '../../reducers/product';
import { add } from '../../reducers/cart';
import { radioFilled, radioEmpty, closeButton } from '../../assets';
import './ProductModal.scss';

const endOfYear = [
  'December 23rd', 'December 24th', 'December 25th', 'December 26th',
  'December 27th', 'December 28th', 'December 29th', 'December 30th',
  'December 31st', 'January 1st', 'January 2nd'
]

class ProductModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      delivery: '',
      XS: this.props.product.XS,
      SM: this.props.product.SM,
      M: this.props.product.M,
      L: this.props.product.L,
      XL: this.props.product.XL,
      XL2: this.props.product.XL2,
      XL3: this.props.product.XL3,
      XL4: this.props.product.XL4,
      titles: [
        {text: 'front', display: true},
        {text: 'back', display: false},
        {text: 'bottom', display: false},
        {text: 'leftSleeve', display: false},
        {text: 'rightSleeve', display: false}
      ]
    }
    this.updateSize = this.updateSize.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.openLocal = this.openLocal.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.downloadMockup = this.downloadMockup.bind(this);
    this.setDelivery = this.setDelivery.bind(this);
    this.updTitles = this.updTitles.bind(this);
  }

  componentDidMount() {
    this.props.setColor(this.props.product.colors[0]);
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

  updateSize(e, size) {
    if (!isNaN(e.target.value)) {
      var newState = Object.assign({}, this.state);
      newState[size] = e.target.value;
      this.setState(newState);
      this.props.updateSize(size, e.target.value);
    }
  }

  openLocal() {
    document.getElementById('inputButton').click();
  }

  storeFile(e) {
    var mockup = this.props.product.mockup;
    var reader = new FileReader();
    var imgName = e.currentTarget.files[0].name;
    reader.onloadend = () => {
      this.props.addImage({src: reader.result, name: imgName}, mockup.views[mockup.index]);
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
    document.getElementById('inputButton').value = '';
  }

  addToCart() {
    var product = this.props.product;
    product.mockup = this.props.product.mockup;
    product.mockup.index = 0;
    this.props.add(product);
    this.props.setModal(false);
    localStorage.setItem('cart', JSON.stringify(this.props.cart));
  }

  downloadMockup() {
    var html = document.getElementsByClassName("Mockup")[0];
    html2canvas(html).then((canvas) => {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'mockup.jpg';
      a.click();
    });
  }

  updTitles(title) {
    var newState = Object.assign({}, this.state);
    var adding = true, changed;
    newState.titles.forEach((view) => {
      if (view.text === title) {
        if (view.display) {
          adding = false;
        } else {
          changed = view.text;
        }
        view.display = !view.display;
      }
    });
    this.setState(newState, () => {
      this.props.toggleLoc(title);
      this.props.setTitles(this.state.titles, adding, changed);
    })
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
                <input type="text" value={this.state.XS} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'XS')} name="XS" />
                <input type="text" value={this.state.SM} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'SM')} name="SM" />
                <input type="text" value={this.state.M} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'M')} name="M" />
                <input type="text" value={this.state.L} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'L')} name="L" />
                <input type="text" value={this.state.XL} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'XL')} name="XL" />
                <input type="text" value={this.state.XL2} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'XL2')} name="XL2" />
                <input type="text" value={this.state.XL3} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'XL3')} name="XL3" />
                <input type="text" value={this.state.XL4} placeholder="0"
                  onChange={(e) => this.updateSize(e, 'XL4')} name="XL4" />
              </div>
            </div>
            <div className="locations">
              <div className="location">
                <h3>Location</h3>
                <div className="radio-button">
                <img src={this.props.product.front ? (radioFilled):
                  (radioEmpty)} onClick={() => this.updTitles('front')} /> Front
                </div>
                <div className="radio-button">
                  <img src={this.props.product.back ? (radioFilled):
                  (radioEmpty)} onClick={() => this.updTitles('back')} /> Back
                </div>
                <div className="radio-button">
                  <img src={this.props.product.bottom ? (radioFilled):
                  (radioEmpty)} onClick={() => this.updTitles('bottom')} /> Bottom
                </div>
                <div className="radio-button">
                  <img src={this.props.product.leftSleeve ? (radioFilled):
                  (radioEmpty)} onClick={() => this.updTitles('leftSleeve')} /> Left Sleeve
                </div>
                <div className="radio-button">
                  <img src={this.props.product.rightSleeve ? (radioFilled):
                  (radioEmpty)} onClick={() => this.updTitles('rightSleeve')} /> Right Sleeve
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
            <Mockup product={this.props.product} key={this.props.product.guid} edit={true} />
            <div className="mockup-options">
              <div className="upload-photo">
                <input id="inputButton" type="file"
                  accept="image/x-png,image/jpeg"
                  onChange={this.storeFile} />
                <button onClick={this.openLocal}>+ Upload Artwork</button>
              </div>
              <button onClick={this.downloadMockup}>Download Mockup</button>
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
    modal: state.modal,
    nav: state.nav,
    cart: state.cart
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
  add: add,
  setTitles: setTitles
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);
