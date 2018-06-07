import { React, Component } from '../../packages';
import './style.scss';

class SizingForm extends Component {

  componentDidMount() {
    let leftShadow = document.getElementById('left-shadow');
    let rightShadow = document.getElementById('right-shadow');
    let sizingForm = document.getElementById('sizing-form');
    leftShadow.style.display = "none";
    rightShadow.style.left = sizingForm.clientWidth + "px";
    document.getElementById('sizing-form').addEventListener('scroll', (e) => {
      if (e.target.scrollLeft > 0) {
        leftShadow.style.display = "block";
        leftShadow.style.right = (e.target.clientWidth - e.target.scrollLeft) + "px";
      } else {
        leftShadow.style.display = "none";
      }
      if (e.target.scrollWidth - e.target.scrollLeft > e.target.clientWidth) {
        rightShadow.style.display = "block";
        rightShadow.style.left = (e.target.clientWidth + e.target.scrollLeft) + "px";
      } else {
        rightShadow.style.display = "none";
      }
    });
  }

  render() {
    return (
      <div className="SizingForm flex" id="sizing-form">
        <div id="left-shadow" className="shadow"></div>
        <div className="scroll-area flex">
          <div className="size">
            <input type="text" name="XS" onChange={this.props.updSizing}
              value={this.props.order.XS} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">XS</h1>
          </div>
          <div className="size">
            <input type="text" name="S" onChange={this.props.updSizing}
               value={this.props.order.S} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">S</h1>
          </div>
          <div className="size">
            <input type="text" name="M" onChange={this.props.updSizing}
               value={this.props.order.M} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">M</h1>
          </div>
          <div className="size">
            <input type="text" name="L" onChange={this.props.updSizing}
               value={this.props.order.L} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">L</h1>
          </div>
          <div className="size">
            <input type="text" name="XL" onChange={this.props.updSizing}
               value={this.props.order.XL} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">XL</h1>
          </div>
          <div className="size">
            <input type="text" name="XL2" onChange={this.props.updSizing}
               value={this.props.order.XL2} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">2XL</h1>
            {this.props.optionalText ? (
              <h1 className="fs-8 c-gray-3">$2.50 Extra</h1>
            ) : null}
          </div>
          <div className="size">
            <input type="text" name="XL3" onChange={this.props.updSizing}
               value={this.props.order.XL3} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">3XL</h1>
            {this.props.optionalText ? (
              <h1 className="fs-8 c-gray-3">$3.50 Extra</h1>
            ) : null}
          </div>
          <div className="size">
            <input type="text" name="XL4" onChange={this.props.updSizing}
               value={this.props.order.XL4} className="fs-18 c-black" placeholder="0" />
            <h1 className="fs-18 c-gray-3">4XL</h1>
            {this.props.optionalText ? (
              <h1 className="fs-8 c-gray-3">$4 Extra</h1>
            ) : null}
          </div>
        </div>
        <div id="right-shadow" className="shadow"></div>
      </div>
    );
  }
}

export default SizingForm;