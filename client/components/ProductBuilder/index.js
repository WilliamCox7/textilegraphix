import { React, Component, NumberFormat, domtoimage, moment, jszip, saveAs, MediaQuery } from '../../packages';
import { closeXWhite, frontSideButton, backSideButton } from '../../assets';
import { PrintArea, Footer } from '../';
import './style.scss';

const endOfYear = [
  'December 23rd', 'December 24th', 'December 25th', 'December 26th',
  'December 27th', 'December 28th', 'December 29th', 'December 30th',
  'December 31st', 'January 1st', 'January 2nd'
];

class ProductBuilder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: props.product,
      selectedColor: props.product.colors[0].name,
      selectedHex: props.product.colors[0].hex,
      quantity: 1,
      frontColors: 0,
      backColors: 0,
      leftSleeveColors: 0,
      rightSleeveColors: 0,
      foldedAndBagged: false,
      insideTagPrinting: false,
      hemTags: false,
      total: 0,
      totalPerShirt: 0,
      delivery: '',
      shownSide: 0,
      uploaded: {
        front: [],
        back: []
      }
    }
    this.updateColor = this.updateColor.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.incrimentColor = this.incrimentColor.bind(this);
    this.decrimentColor = this.decrimentColor.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.toggleShownSide = this.toggleShownSide.bind(this);
    this.downloadMockup = this.downloadMockup.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.storeFile = this.storeFile.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  componentDidMount() {
    this.calculateTotalCost(this.state);
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

  updateColor(color) {
    this.setState({selectedColor: color.name, selectedHex: color.hex}, () => {
      this.calculateTotalCost(this.state);
    });
  }

  updateQuantity(e) {
    if (!isNaN(e.target.value)) {
      this.setState({quantity: Number(e.target.value)}, () => {
        this.calculateTotalCost(this.state);
      });
    }
  }

  incrimentColor(color) {
    let prop = color + "Colors";
    let newState = Object.assign({}, this.state);
    newState[prop] = newState[prop] + 1;
    this.setState(newState, () => {
      this.calculateTotalCost(this.state);
    });
  }

  decrimentColor(color) {
    let prop = color + "Colors";
    let newState = Object.assign({}, this.state);
    newState[prop] = newState[prop] - 1;
    if (newState[prop] < 0) {
      newState[prop] = 0;
    }
    this.setState(newState, () => {
      this.calculateTotalCost(this.state);
    });
  }

  updateCheckBox(e) {
    let newState = Object.assign({}, this.state);
    newState[e.target.name] = !newState[e.target.name];
    this.setState(newState, () => {
      this.calculateTotalCost(this.state);
    });
  }

  calculateTotalCost(state) {
    let total = 0, totalPerShirt = 0;
    const baseShirtCost = 5;
    total += baseShirtCost * state.quantity;
    total += state.frontColors * state.quantity;
    total += state.backColors * state.quantity;
    total += state.leftSleeveColors * state.quantity;
    total += state.rightSleeveColors * state.quantity;
    total += state.foldedAndBagged ? .4 * state.quantity : 0;
    total += state.insideTagPrinting ? 1.15 * state.quantity : 0;
    total += state.hemTags ? 2.25 * state.quantity : 0;
    totalPerShirt = total === 0 ? 0 : total / state.quantity;
    this.setState({total: total, totalPerShirt: totalPerShirt});
  }

  toggleShownSide(side) {
    this.setState({shownSide: side});
  }

  downloadMockup() {
    var zip = new jszip();
    var folderName = "mockup-" + this.props.product.number;
    var folder = zip.folder(folderName);
    var front = document.getElementById("front-side");
    var back = document.getElementById("back-side");
    var promises = [
      domtoimage.toBlob(front).then((blob) => {
        folder.file("front.png", blob);
      }),
      domtoimage.toBlob(back).then((blob) => {
        folder.file("back.png", blob);
      })
    ];
    Promise.all(promises).then(() => {
      zip.generateAsync({type: "blob"}).then((content) => {
        var zipName = folderName + ".zip";
        saveAs(content, zipName);
      });
    });
  }

  uploadImage(image) {
    let side = this.state.shownSide ? 'back' : 'front';
    let newState = Object.assign({}, this.state);
    newState.uploaded[side].push(image);
    this.setState(newState);
  }

  storeFile(e) {
    var reader = new FileReader();
    var imgName = e.currentTarget.files[0].name;
    reader.onloadend = () => {
      this.uploadImage({src: reader.result, name: imgName});
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
    document.getElementById('inputButton').value = '';
  }

  removeImage(index) {
    let side = this.state.shownSide ? 'back' : 'front';
    let newState = Object.assign({}, this.state);
    newState.uploaded[side].splice(index, 1);
    this.setState(newState);
  }

  render() {

    let colors = this.props.product.colors.map((color, i) => {
      return (
        <span key={i} style={{"background": color.hex}}
          onClick={() => this.updateColor(color)}></span>
      );
    });

    return (
      <div className="ProductBuilder">
        <MediaQuery className="top-bar flex jc-sb ai-c" minWidth={1200}>
          <h1>{this.props.product.brand} {this.props.product.number}</h1>
          <span><img src={closeXWhite} onClick={this.props.toggleBuilder} /></span>
        </MediaQuery>
        <div className="builder flex">
          <div className="left side flex fd-c ai-c jc-sb">
            <MediaQuery maxWidth={1200}>
              <h2>{this.props.product.brand} {this.props.product.number}</h2>
            </MediaQuery>
            <h1>{this.props.product.description}</h1>
            <h2>{this.state.selectedColor.toUpperCase()}</h2>
            <div className="color-boxes flex">{colors}</div>
            <div className="steps">
              <div className="step">
                <div className="step-no flex ai-c">
                  <span className="flex ai-c jc-c">1.</span>
                  <h1>QUANTITY & COLORS</h1>
                </div>
                <div className="content-wrapper flex">
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                  <div className="content quantity-colors flex jc-sa">
                    <div className="section">
                      <h3 className="flex jc-c ai-c">QTY</h3>
                      <div className="bottom-portion flex ai-c jc-c">
                        <input value={this.state.quantity} type="text" onChange={this.updateQuantity} />
                        <span></span>
                      </div>
                    </div>
                    <div className="section">
                      <h3 className="flex jc-c ai-c">Front Colors</h3>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus" onClick={() => this.decrimentColor('front')}></i>
                        <h4>{this.state.frontColors}</h4>
                        <i className="fas fa-plus" onClick={() => this.incrimentColor('front')}></i>
                        <span></span>
                      </div>
                    </div>
                    <div className="section">
                      <h3 className="flex jc-c ai-c">Back Colors</h3>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus" onClick={() => this.decrimentColor('back')}></i>
                        <h4>{this.state.backColors}</h4>
                        <i className="fas fa-plus" onClick={() => this.incrimentColor('back')}></i>
                        <MediaQuery minWidth={550}>
                          <span></span>
                        </MediaQuery>
                      </div>
                    </div>
                    <MediaQuery className="section" minWidth={550}>
                      <h3 className="flex jc-c ai-c">Left Sleeve Colors</h3>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus" onClick={() => this.decrimentColor('leftSleeve')}></i>
                        <h4>{this.state.leftSleeveColors}</h4>
                        <i className="fas fa-plus" onClick={() => this.incrimentColor('leftSleeve')}></i>
                        <span></span>
                      </div>
                    </MediaQuery>
                    <MediaQuery className="section" minWidth={550}>
                      <h3>Right Sleeve Colors</h3>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus" onClick={() => this.decrimentColor('rightSleeve')}></i>
                        <h4>{this.state.rightSleeveColors}</h4>
                        <i className="fas fa-plus" onClick={() => this.incrimentColor('rightSleeve')}></i>
                      </div>
                    </MediaQuery>
                  </div>
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                </div>
              </div>
              <div className="step">
                <div className="step-no flex ai-c">
                  <span className="flex ai-c jc-c">2.</span>
                  <h1>ADD ONS</h1>
                </div>
                <div className="content-wrapper flex">
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                  <div className="content add-ons">
                    <div className="section flex ai-c">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" checked={this.state.foldedAndBagged}
                            name="foldedAndBagged" onClick={this.updateCheckBox} />
                          <span></span>
                        </label>
                      </div>
                      <h4>Folded and Bagged - </h4>
                      <h1> $.40 / Shirt</h1>
                    </div>
                    <div className="section flex ai-c">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" checked={this.state.insideTagPrinting}
                            name="insideTagPrinting" onClick={this.updateCheckBox} />
                          <span></span>
                        </label>
                      </div>
                      <h4>Inside Tag Printing - </h4>
                      <h1> $1.15 / Shirt</h1>
                    </div>
                    <div className="section flex ai-c">
                      <div className="checkbox">
                        <label>
                          <input type="checkbox" checked={this.state.hemTags}
                            name="hemTags" onClick={this.updateCheckBox} />
                          <span></span>
                        </label>
                      </div>
                      <h4>Hem Tags - </h4>
                      <h1> $2.25 / Shirt </h1>
                      <h5> *100pcs Minimum</h5>
                    </div>
                  </div>
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                </div>
              </div>
            </div>
            <div className="total">
              <div className="total-headers flex">
                <span className="total-header flex ai-c jc-c">TOTAL</span>
                <div className="headers flex ai-fe">
                  <h5>
                    <MediaQuery minWidth={550}>
                      Price Per Shirt:
                    </MediaQuery>
                  </h5>
                  <h5>Estimated Total:</h5>
                </div>
              </div>
              <div className="content-wrapper flex">
                <MediaQuery minWidth={550}>
                  <span className="space-large"></span>
                </MediaQuery>
                <div className="content total-content flex">
                  <div className="section flex fd-c ai-c jc-c">
                    <MediaQuery maxWidth={550}>
                      <h1>Price Per Shirt:</h1>
                    </MediaQuery>
                    <div className="row flex">
                      <h2>
                        <NumberFormat value={this.state.totalPerShirt} displayType={'text'}
                          thousandSeparator={true} prefix={'$'} decimalScale={2} />
                      </h2>
                      <h3 className="divider">/</h3>
                      <h3>Shirt</h3>
                    </div>
                    <MediaQuery className="row flex" minWidth={550}>
                      <h5>2XL - $2.50 more.</h5>
                      <h5>3XL - $3.50 more.</h5>
                    </MediaQuery>
                  </div>
                  <div className="section flex fd-c jc-c">
                    <div className="row">
                      <h4>
                        <NumberFormat value={this.state.total} displayType={'text'}
                          thousandSeparator={true} prefix={'$'} decimalScale={2} />
                      </h4>
                    </div>
                    <div className="row">
                      <h1>Estimated Delivery:</h1>
                    </div>
                    <div className="row">
                      <h4>{this.state.delivery}</h4>
                    </div>
                  </div>
                </div>
                <MediaQuery minWidth={550}>
                  <span className="space"></span>
                </MediaQuery>
              </div>
              <MediaQuery maxWidth={550}>
                <div className="action-buttons">
                  <button className="add-to-quote">ADD TO QUOTE</button>
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className="right side">
            <div className="side-buttons-left flex fd-c">
              <span onClick={() => this.toggleShownSide(0)}>
                <img src={frontSideButton} />
              </span>
              <span onClick={() => this.toggleShownSide(1)}>
                <img src={backSideButton} />
              </span>
            </div>
            <MediaQuery maxWidth={550}>
              <div className="side-buttons-right">
                <span onClick={() => document.getElementById('inputButton').click()}>
                  <i className="fas fa-plus-circle"></i>
                </span>
              </div>
            </MediaQuery>
            <div id="back-side" className="product-image"
              style={this.state.shownSide ? {"zIndex": 1} : {"zIndex": 0}}>
              <img src={this.state.product.images[this.state.selectedHex][1]} />
              <PrintArea uploaded={this.state.uploaded.back} removeImage={this.removeImage} />
            </div>
            <div id="front-side" className="product-image"
              style={this.state.shownSide ? {"zIndex": 0} : {"zIndex": 1}}>
              <img src={this.state.product.images[this.state.selectedHex][0]} />
              <PrintArea uploaded={this.state.uploaded.front} removeImage={this.removeImage} />
            </div>
            <MediaQuery className="action-buttons flex jc-sb" minWidth={550}>
              <button className="download" onClick={this.downloadMockup}>DOWNLOAD</button>
              <button className="download" onClick={
                () => document.getElementById('inputButton').click()
              }>UPLOAD</button>
              <button className="add-to-quote">ADD TO QUOTE</button>
            </MediaQuery>
            <input id="inputButton" type="file" accept="image/x-png,image/jpeg"
              onChange={this.storeFile} />
          </div>
        </div>
        <MediaQuery maxWidth={1200}>
          <Footer />
        </MediaQuery>
      </div>
    );
  }
}

export default ProductBuilder;
