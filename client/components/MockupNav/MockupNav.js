import { React, Component, connect } from '../../packages';
import { updateViewIndex } from '../../reducers/product';
import { lightGrayArrow } from '../../assets';
import './MockupNav.scss';

class MockupNav extends Component {

  constructor() {
    super();
    // thinking about importing props and putting it into state.
    // instead of passing in this.props.mockup, set it to state and use that to manipulate the views
    this.changeView = this.changeView.bind(this);
  }

  changeView(index, curIndex, length) {
    console.log(index, curIndex, length);
    if (index >= 0 && index < length) {
      this.props.updateViewIndex(index);
      var viewContainer = document.getElementById("view-container");
      var marginLeft = viewContainer.style.marginLeft;
      var marginValue = Number(marginLeft.substring(0, marginLeft.length - 2));
      if (index < curIndex) {
        var newMargin = marginValue + 326;
        viewContainer.style.marginLeft = newMargin + "px";
      } else if (index > curIndex) {
        var newMargin = marginValue - 326;
        viewContainer.style.marginLeft = newMargin + "px";
      }
    }
  }

  render() {
    var curIndex = this.props.mockup.index;
    var prevIndex = curIndex - 1;
    var nextIndex = curIndex + 1;
    var length = this.props.mockup.length;

    return(
      <div className="MockupNav">
        <div className="title">
          {this.props.mockup.titles[curIndex]}
        </div>
        {length > 1 ? (
          <div className="circles">
            <img onClick={() => this.changeView(prevIndex, curIndex, length)} className="left-arrow" src={lightGrayArrow} />
            {this.props.circles}
            <img onClick={() => this.changeView(nextIndex, curIndex, length)} src={lightGrayArrow} />
          </div>
        ) : null}
      </div>
    );
  }

}

const mapDispatchToProps = {
  updateViewIndex: updateViewIndex
}

export default connect(null, mapDispatchToProps)(MockupNav);
