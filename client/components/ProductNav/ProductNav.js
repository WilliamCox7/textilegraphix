import { React, Component } from '../../packages';
import { lightGrayArrow } from '../../assets';
import './ProductNav.scss';

class ProductNav extends Component {

  constructor() {
    super();
    this.state = {
      index: 0
    }
    this.changeView = this.changeView.bind(this);
  }

  changeView(index, curIndex, length) {
    if (index >= 0 && index < length) {
      var newState = Object.assign({}, this.state);
      newState.index = index;
      this.setState(newState);
      var prodContainer = document.getElementById("product-container");
      var marginLeft = prodContainer.style.marginLeft;
      var marginValue = Number(marginLeft.substring(0, marginLeft.length - 2));
      if (index < curIndex) {
        var newMargin = marginValue + 326;
        prodContainer.style.marginLeft = newMargin + "px";
      } else if (index > curIndex) {
        var newMargin = marginValue - 326;
        prodContainer.style.marginLeft = newMargin + "px";
      }
    }
  }

  render() {
    var curIndex = this.state.index;
    var prevIndex = curIndex - 1;
    var nextIndex = curIndex + 1;
    var length = this.props.length;
    var title;
    if (this.props.products.length > 0) {
      title = this.props.products[curIndex].brand + " " + this.props.products[curIndex].number;
    }


    var circles = [];
    for (var i = 0; i < length; i++) {
      circles.push(
        <span key={i} className={curIndex === i ? "circle active" : "circle"}></span>
      );
    }

    return(
      <div className="ProductNav">
        {length > 1 ? (
          <div className="circles">
            <img onClick={() => this.changeView(prevIndex, curIndex, length)} className="left-arrow" src={lightGrayArrow} />
            {circles}
            <img onClick={() => this.changeView(nextIndex, curIndex, length)} src={lightGrayArrow} />
          </div>
        ) : null}
        <div className="title">
          {title}
        </div>
      </div>
    );
  }

}

export default ProductNav;
