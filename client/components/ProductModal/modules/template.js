import { React } from '../../../packages';
import { Mockup } from '../../index';
import { radioFilled, radioEmpty, closeButton } from '../../../assets';

export function template(ProductModal) {
  var colors = ProductModal.props.product.colors.map((color, i) => {
    return (
      <div className="color" key={i} style={ProductModal.props.product.color === color ? {
        border: 'solid 3px #44B1DE', background: color} : {background: color}}
        onClick={() => ProductModal.props.setColor(color)}>
      </div>
    )
  });

  return (
    <div className="ProductModal">
      <div className="backdrop"
        onClick={() => {ProductModal.props.setModal(false); ProductModal.props.resetProduct()}}>
      </div>
      <div className="modal">
        <div className="column">
          <h1>{ProductModal.props.product.brand.toUpperCase()}</h1>
          <h1>{ProductModal.props.product.number}</h1>
          <p>{ProductModal.props.product.description}</p>
          <div className="colors">
            {colors}
          </div>
          <div className="print-type">
            <div className="radio-button">
              <img src={ProductModal.props.product.isScreen ? (radioFilled):
              (radioEmpty)} onClick={ProductModal.props.toggleType} /> Screen Print
            </div>
            <div className="radio-button">
            <img src={!ProductModal.props.product.isScreen ? (radioFilled):
              (radioEmpty)} onClick={ProductModal.props.toggleType} /> Embroidery
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
              <input type="text" value={ProductModal.state.XS} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'XS')} name="XS" />
              <input type="text" value={ProductModal.state.SM} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'SM')} name="SM" />
              <input type="text" value={ProductModal.state.M} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'M')} name="M" />
              <input type="text" value={ProductModal.state.L} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'L')} name="L" />
              <input type="text" value={ProductModal.state.XL} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'XL')} name="XL" />
              <input type="text" value={ProductModal.state.XL2} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'XL2')} name="XL2" />
              <input type="text" value={ProductModal.state.XL3} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'XL3')} name="XL3" />
              <input type="text" value={ProductModal.state.XL4} placeholder="0"
                onChange={(e) => ProductModal.updateSize(e, 'XL4')} name="XL4" />
            </div>
          </div>
          <div className="locations">
            <div className="location">
              <h3>Location</h3>
              <div className="radio-button">
                <img src={ProductModal.props.product.front ? (radioFilled):
                (radioEmpty)} onClick={() => ProductModal.props.toggleLoc('front')} /> Front
              </div>
              <div className="radio-button">
                <img src={ProductModal.props.product.back ? (radioFilled):
                (radioEmpty)} onClick={() => ProductModal.props.toggleLoc('back')} /> Back
              </div>
              <div className="radio-button">
                <img src={ProductModal.props.product.bottom ? (radioFilled):
                (radioEmpty)} onClick={() => ProductModal.props.toggleLoc('bottom')} /> Bottom
              </div>
              <div className="radio-button">
                <img src={ProductModal.props.product.leftSleeve ? (radioFilled):
                (radioEmpty)} onClick={() => ProductModal.props.toggleLoc('leftSleeve')} /> Left Sleeve
              </div>
              <div className="radio-button">
                <img src={ProductModal.props.product.rightSleeve ? (radioFilled):
                (radioEmpty)} onClick={() => ProductModal.props.toggleLoc('rightSleeve')} /> Right Sleeve
              </div>
            </div>
            <div className="color-count">
              <h3>Color</h3>
              <div className="count">
                <button onClick={() => ProductModal.props.dec('colorFront')}>-</button>
                {ProductModal.props.product.colorFront}
                <button onClick={() => ProductModal.props.inc('colorFront')}>+</button>
              </div>
              <div className="count">
                <button onClick={() => ProductModal.props.dec('colorBack')}>-</button>
                {ProductModal.props.product.colorBack}
                <button onClick={() => ProductModal.props.inc('colorBack')}>+</button>
              </div>
              <div className="count">
                <button onClick={() => ProductModal.props.dec('colorBottom')}>-</button>
                {ProductModal.props.product.colorBottom}
                <button onClick={() => ProductModal.props.inc('colorBottom')}>+</button>
              </div>
              <div className="count">
                <button onClick={() => ProductModal.props.dec('colorLeftSleeve')}>-</button>
                {ProductModal.props.product.colorLeftSleeve}
                <button onClick={() => ProductModal.props.inc('colorLeftSleeve')}>+</button>
              </div>
              <div className="count">
                <button onClick={() => ProductModal.props.dec('colorRightSleeve')}>-</button>
                {ProductModal.props.product.colorRightSleeve}
                <button onClick={() => ProductModal.props.inc('colorRightSleeve')}>+</button>
              </div>
            </div>
          </div>
          <div className="totals">
              <h3>Est. Subtotal:</h3>
              <h2>${ProductModal.props.product.subtotal.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h2>
            </div>
            <div className="totals">
              <h3>Est. Delivery:</h3>
              <h2>{ProductModal.state.delivery}</h2>
            </div>
        </div>
        <div className="column">
          <Mockup image={ProductModal.props.product.image} edit={true} />
          <div className="mockup-options">
            <div className="upload-photo">
              <input id="inputButton" type="file"
                accept="image/x-png,image/jpeg"
                onChange={ProductModal.storeFile} />
              <button onClick={ProductModal.openLocal}>+ Upload Artwork</button>
            </div>
            <button onClick={ProductModal.downloadMockup}>Download Mockup</button>
          </div>
          <button className="add-quote" onClick={ProductModal.addToCart}>Add to Quote Submission</button>
        </div>
        <img className="close-button" src={closeButton}
          onClick={() => {ProductModal.props.setModal(false); ProductModal.props.resetProduct()}} />
      </div>
    </div>
  );
}
