import { React, Component, NumberFormat, domtoimage, moment, jszip, saveAs, MediaQuery, connect } from '../../packages';
import { getAsset, calculateTotalCost } from '../../modules';
import { PrintArea, Footer, WaitIndicator, HelpHover, SizingForm } from '../';
import { addOrder } from '../../reducers/cart';
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
      sleeveColors: 0,
      foldedAndBagged: false,
      insideTagPrinting: false,
      total: 0,
      totalPerShirt: 0,
      delivery: '',
      shownSide: 0,
      showAddOns: true,
      waiting: false,
      showHelp: false,
      zip: '',
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
      XL4: ""
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
    this.addProductToCart = this.addProductToCart.bind(this);
    this.toggleAddOns = this.toggleAddOns.bind(this);
    this.toggleWaitIndicator = this.toggleWaitIndicator.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.fadeHelp = this.fadeHelp.bind(this);
    this.cancelHelpTimer = this.cancelHelpTimer.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
    this.updSizing = this.updSizing.bind(this);
    this.setDelivery = this.setDelivery.bind(this);
    this.setZip = this.setZip.bind(this);
  }

  componentDidMount() {
    this.calculateTotalCost(this.state);
    this.setDelivery();
    let initState = Object.assign({}, this.state, this.props.productBuilderInit);
    initState.delivery = this.setDelivery();
    this.setState(initState);
  }

  componentWillUnmount() {
    this.cancelHelpTimer();
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
    return displayedDay;
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
    let results = calculateTotalCost(this.state);
    this.setState({total: results.totalCost, totalPerShirt: results.costPerShirt});
  }

  toggleShownSide(side) {
    this.setState({shownSide: side});
  }

  toggleAddOns() {
    this.setState({showAddOns: !this.state.showAddOns});
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

  toggleWaitIndicator() {
    this.setState({waiting: !this.state.waiting});
  }

  toggleHelp() {
    this.setState({showHelp: !this.state.showHelp});
  }

  showHelp() {
    this.cancelHelpTimer();
    this.setState({showHelp: true});
  }

  fadeHelp() {
    let self = this;
    let helpHover = document.getElementById('help-hover');
    self.opacityTimer = setTimeout(() => {
      helpHover.style.opacity = 0;
    }, 500);
    self.showHelpTimer = setTimeout(() => {
      helpHover.style.opacity = 1;
      self.setState({showHelp: false});
    }, 1500);
  }

  cancelHelpTimer() {
    let helpHover = document.getElementById('help-hover');
    if (this.opacityTimer) {
      clearTimeout(this.opacityTimer);
      this.opacityTimer = null;
    }
    if (this.showHelpTimer) {
      clearTimeout(this.showHelpTimer);
      this.showHelpTimer = null;
    }
    if (helpHover) {
      helpHover.style.opacity = 1;
    }
  }

  addProductToCart() {
    this.toggleWaitIndicator();
    let newState = Object.assign({}, this.state);
    newState.guid = this.createGuid();
    var front = document.getElementById("front-side");
    var back = document.getElementById("back-side");
    var promises = [
      domtoimage.toPng(front),
      domtoimage.toPng(back)
    ]
    Promise.all(promises).then((mockup) => {
      newState.mockup = mockup;
      this.setState(newState, () => {
        this.props.addOrder(this.state);
        this.props.toggleBuilder();
        this.toggleWaitIndicator();
      });
    });
  }

  createGuid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4();
  }

  updSizing(e, order) {
    if (!isNaN(e.target.value)) {
      let newState = Object.assign({}, this.state);
      newState[e.target.name] = Number(e.target.value);
      newState.quantity = 0;
      if (newState.XS) newState.quantity += newState.XS;
      if (newState.S) newState.quantity += newState.S;
      if (newState.M) newState.quantity += newState.M;
      if (newState.L) newState.quantity += newState.L;
      if (newState.XL) newState.quantity += newState.XL;
      if (newState.XL2) newState.quantity += newState.XL2;
      if (newState.XL3) newState.quantity += newState.XL3;
      if (newState.XL4) newState.quantity += newState.XL4;
      this.setState(newState, () => {
        this.calculateTotalCost(this.state);
      })
    }
  }

  setZip() {
    this.setState({zip: '12111'});
  }

  render() {

    let colors = this.props.product.colors.map((color, i) => {
      let style = {"background": color.hex};
      if (color.hex === this.state.selectedHex) style.border = "solid 1px black";
      return (
        <span key={i} style={style}
          onClick={() => this.updateColor(color)}></span>
      );
    });

    return (
      <div className="ProductBuilder">
        <MediaQuery className="top-bar flex jc-sb ai-c" minWidth={1200}>
          <h1 className="fs-24 c-white fw-bold">{this.props.product.brand} {this.props.product.number}</h1>
          <span className="close-button"><img src={getAsset('close-x-white')} onClick={this.props.toggleBuilder} /></span>
          <div className="right-buttons flex">
            <button className="help-button flex" onMouseEnter={this.showHelp} onMouseLeave={this.fadeHelp}>
              <h1 className="fs-15 fw-bold c-white">HELP</h1>
              <span className="fs-15 fw-bold c-blue">?</span>
            </button>
            <button className="fs-15 fw-bold c-white add-button" onClick={this.addProductToCart}>ADD TO QUOTE</button>
            {this.state.showHelp ? (
              <HelpHover fadeHelp={this.fadeHelp} cancelHelpTimer={this.cancelHelpTimer} />
            ) : null}
          </div>
        </MediaQuery>
        <div className="builder flex">
          <div className="left side flex fd-c ai-c jc-sb">
            <MediaQuery maxWidth={1200}>
              <h1 className="fs-20 c-black fw-bold">{this.props.product.brand} {this.props.product.number}</h1>
            </MediaQuery>
            <h1 className="fs-20 c-gray-1">{this.props.product.description}</h1>
            <h1 className="fs-20 c-black fw-bold">{this.state.selectedColor.toUpperCase()}</h1>
            <div className="color-boxes flex">{colors}</div>
            <div className="steps">
              <div className="step">
                <div className="step-no flex ai-c">
                  <span className="flex ai-c jc-c fs-20 c-white">1.</span>
                  <h1 className="fs-18 c-blue fw-bold">QUANTITY & COLORS</h1>
                </div>
                <div className="content-wrapper flex">
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                  <div className="content quantity-colors flex jc-sa">
                    <div className="section">
                      <h1 className="flex jc-c ai-c fs-12 c-black fw-bold">QTY</h1>
                      <div className="bottom-portion flex ai-c jc-c">
                        <input className="fs-30 c-black fw-bold" value={this.state.quantity} type="text" onChange={this.updateQuantity} />
                        <span></span>
                      </div>
                    </div>
                    <div className="section">
                      <h1 className="flex jc-c ai-c fs-12 c-black fw-bold">Front Colors</h1>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('front')}></i>
                        <h1 className="fs-24 c-black fw-bold">{this.state.frontColors}</h1>
                        <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('front')}></i>
                        <span></span>
                      </div>
                    </div>
                    <div className="section">
                      <h1 className="flex jc-c ai-c fs-12 c-black fw-bold">Back Colors</h1>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('back')}></i>
                        <h1 className="fs-24 c-black fw-bold">{this.state.backColors}</h1>
                        <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('back')}></i>
                        <MediaQuery minWidth={550}>
                          <span></span>
                        </MediaQuery>
                      </div>
                    </div>
                    <MediaQuery className="section" minWidth={550}>
                      <h1 className="flex jc-c ai-c fs-12 c-black fw-bold">Sleeve Colors</h1>
                      <div className="bottom-portion flex ai-c jc-c">
                        <i className="fas fa-minus fs-12 c-blue" onClick={() => this.decrimentColor('sleeve')}></i>
                        <h1 className="fs-24 c-black fw-bold">{this.state.sleeveColors}</h1>
                        <i className="fas fa-plus fs-12 c-blue" onClick={() => this.incrimentColor('sleeve')}></i>
                      </div>
                    </MediaQuery>
                  </div>
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                </div>
              </div>
              <div className="step" style={this.state.showAddOns ? null : {"borderBottom": "solid 1px #D1D1D1"}}>
                <div className="step-no flex ai-c">
                  <span className="flex ai-c jc-c fs-20 c-white">2.</span>
                  <h1 className="fs-18 c-blue fw-bold" onClick={this.toggleAddOns}>
                    ADD ONS
                    {this.state.showAddOns ? (
                      <i className="fas fa-angle-down"></i>
                    ) : (
                      <i className="fas fa-angle-right"></i>
                    )}
                  </h1>
                </div>
                {this.state.showAddOns ? (
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
                        <h1 className="fs-18 c-black fw-bold">Folded and Bagged - </h1>
                        <h1 className="fs-18 c-gray-3 fw-bold"> $.40 / Shirt</h1>
                      </div>
                      <div className="section flex ai-c">
                        <div className="checkbox">
                          <label>
                            <input type="checkbox" checked={this.state.insideTagPrinting}
                              name="insideTagPrinting" onClick={this.updateCheckBox} />
                            <span></span>
                          </label>
                        </div>
                        <h1 className="fs-18 c-black fw-bold">Inside Tag Printing - </h1>
                        <h1 className="fs-18 c-gray-3 fw-bold"> $1.15 / Shirt</h1>
                      </div>
                    </div>
                    <MediaQuery minWidth={550}>
                      <span className="space"></span>
                    </MediaQuery>
                  </div>
                ) : null}
                <div className="step-no flex ai-c">
                  <span className="flex ai-c jc-c fs-20 c-white">3.</span>
                  <h1 className="fs-18 c-blue fw-bold">
                    SIZING
                  </h1>
                </div>
                <div className="content-wrapper flex">
                  <MediaQuery minWidth={550}>
                    <span className="space"></span>
                  </MediaQuery>
                  <div className="content sizing-wrapper flex">
                    <SizingForm order={this.state} updSizing={this.updSizing} optionalText={true} />
                    <div className="total-box flex jc-c ai-c fd-c">
                      <h1 className="fs-22 c-white">{this.state.quantity}</h1>
                      <h1 className="fs-16 c-white">TOTAL</h1>
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
                <span className="total-header flex ai-c jc-c fs-20 c-white fw-bold">TOTAL</span>
                {this.state.zip ? null : (
                  <h1 className="fs-12 c-gray-3 fw-bold zip-copy">To see pricing, please enter your zipcode.</h1>
                )}
              </div>
              <div className="content-wrapper flex">
                <MediaQuery minWidth={550}>
                  <span className="space-large"></span>
                </MediaQuery>
                {this.state.zip ? (
                  <div className="content total-content flex jc-sb">
                    <div className="section flex fd-c jc-c ai-fs">
                      <h1 className="fs-12 c-gray-3 fw-bold pps-header">Price Per Shirt:</h1>
                      <div className="row flex">
                        <h1 className="fs-26 c-black fw-bold">
                          <NumberFormat value={this.state.totalPerShirt} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} />
                        </h1>
                        <h1 className="fs-26 c-gray-3 fw-bold divider">/</h1>
                        <h1 className="fs-26 c-gray-3 fw-bold">Shirt</h1>
                      </div>
                      <MediaQuery className="row flex" minWidth={550}>
                        <h1 className="fs-8 c-gray-3 fw-bold">2XL - $2.50 more.</h1>
                        <h1 className="fs-8 c-gray-3 fw-bold">3XL - $3.50 more.</h1>
                      </MediaQuery>
                    </div>
                    <div className="section flex fd-c jc-c ai-fs">
                      <div className="row">
                        <h1 className="fs-12 c-gray-3 fw-bold">Estimated Total:</h1>
                      </div>
                      <div className="row">
                        <h1 className="fs-20 c-black fw-bold">
                          <NumberFormat value={this.state.total} displayType={'text'}
                            thousandSeparator={true} prefix={'$'} decimalScale={2} />
                        </h1>
                      </div>
                      <div className="row">
                        <h1 className="fs-12 c-gray-3 fw-bold">Estimated Delivery:</h1>
                      </div>
                      <div className="row">
                        <h1 className="fs-20 c-black fw-bold">{this.state.delivery}</h1>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="content total-content flex fd-c jc-c ai-c">
                    <h1 className="fs-16 fw-bold">WHERE WILL THIS BE SHIPPED?</h1>
                    <div className="ship-buttons flex jc-c">
                      <button className="zip-button fs-10 c-blue">ZIP CODE</button>
                      <button className="ok-button fs-10 c-white" onClick={this.setZip}>OK</button>
                    </div>
                  </div>
                )}
                <MediaQuery minWidth={550}>
                  <span className="space"></span>
                </MediaQuery>
              </div>
              <MediaQuery maxWidth={1200}>
                <div className="action-buttons flex jc-sb">
                  <button className="help-button flex" onClick={this.toggleHelp} onMouseEnter={this.showHelp} onMouseLeave={this.fadeHelp}>
                    <h1 className="fs-15 fw-bold c-white">HELP</h1>
                    <span className="fs-15 fw-bold c-blue">?</span>
                  </button>
                  <button className="add-to-quote" onClick={this.addProductToCart}>ADD TO QUOTE</button>
                  {this.state.showHelp ? (
                    <HelpHover top fadeHelp={this.fadeHelp} cancelHelpTimer={this.cancelHelpTimer} />
                  ) : null}
                </div>
              </MediaQuery>
            </div>
          </div>
          <div className="right side">
            <div className="side-buttons-left flex fd-c">
              <span onClick={() => this.toggleShownSide(0)} className="flex fd-c ai-c jc-c">
                <img src={getAsset('front-side-button')} />
                <h1 className="fs-10">FRONT</h1>
              </span>
              <span onClick={() => this.toggleShownSide(1)} className="flex fd-c ai-c jc-c">
                <img src={getAsset('back-side-button')} />
                <h1 className="fs-10">BACK</h1>
              </span>
            </div>
            <div className="side-buttons-right">
              <span onClick={() => document.getElementById('inputButton').click()} className="flex fd-c ai-c jc-c">
                <i className="fas fa-plus-circle"></i>
                <h1 className="fs-10">ADD LOGO</h1>
              </span>
              <span onClick={this.downloadMockup} className="flex fd-c ai-c jc-c">
                <img src={getAsset('download-button')} />
                <h1 className="fs-10">DOWNLOAD</h1>
              </span>
            </div>
            <div className="product-image-wrapper flex jc-c"
              style={this.state.shownSide ? {"zIndex": 1} : {"zIndex": 0}}>
              <div id="back-side">
                <img src={this.state.product.images[this.state.selectedHex][1]} />
                <PrintArea uploaded={this.state.uploaded.back} removeImage={this.removeImage} />
              </div>
            </div>
            <div className="product-image-wrapper flex jc-c"
              style={this.state.shownSide ? {"zIndex": 0} : {"zIndex": 1}}>
              <div id="front-side">
                <img src={this.state.product.images[this.state.selectedHex][0]} />
                <PrintArea uploaded={this.state.uploaded.front} removeImage={this.removeImage} />
              </div>
            </div>
            <input id="inputButton" type="file" accept="image/x-png,image/jpeg"
              onChange={this.storeFile} />
          </div>
        </div>
        <MediaQuery maxWidth={1200}>
          <Footer />
        </MediaQuery>
        <WaitIndicator message="Preparing your cart..." waiting={this.state.waiting}></WaitIndicator>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addOrder: addOrder
}

export default connect(null, mapDispatchToProps)(ProductBuilder);
