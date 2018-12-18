import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

class SizeForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      limit: 9,
      maxWidth: 'none',
      form: props.form ? props.form : undefined
    }
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.determineMaxWidth = this.determineMaxWidth.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.determineMaxWidth(true);
    window.addEventListener('resize', this.determineMaxWidth);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.determineMaxWidth);
  }

  determineMaxWidth(mounting) {
    let forms = document.getElementsByClassName('SizeForm');
    for (var i = 0; i < forms.length; i++) {
      let form = forms[i];
      let formWidth = form.getBoundingClientRect().width;
      let imgWrapper = form.firstElementChild;
      let imgWrapperMargin = (imgWrapper.currentStyle || window.getComputedStyle(imgWrapper)).marginLeft;
      let imgWrapperLength = imgWrapper.getBoundingClientRect().width + (convertPxToNum(imgWrapperMargin) * 2);
      let circleDisplay = form.children[1].firstElementChild.firstElementChild;
      let inputMargin = (circleDisplay.currentStyle || window.getComputedStyle(circleDisplay)).marginLeft;
      let inputWidth = circleDisplay.getBoundingClientRect().width + (convertPxToNum(inputMargin) * 2);
      let surroundingLength = (imgWrapperLength * 2) + inputWidth;
      let remainingSpace = formWidth - surroundingLength;
      let numOfInputs = Math.floor(remainingSpace / inputWidth);
      if (numOfInputs > 9) numOfInputs = 9;
      let maxWidth = (numOfInputs * inputWidth);
      let newState = Object.assign({}, this.state);
      newState.maxWidth = maxWidth;
      newState.moveAmount = inputWidth;
      newState.limit = numOfInputs;
      if (mounting && numOfInputs >= 9) newState.position = 0;
      this.setState(newState);
    }
  }

  moveLeft() {
    let leftMostPos = 0;
    if (this.state.position > leftMostPos) {
      let prevPos = this.state.position - 1;
      this.setState({position: prevPos});
    }
  }

  moveRight() {
    let rightMostPos = 9 - this.state.limit;
    if (this.state.position < rightMostPos) {
      let nextPos = this.state.position + 1;
      this.setState({position: nextPos});
    }
  }

  update(e) {
    let newState = Object.assign({}, this.state);
    newState.form[e.target.name] = e.target.value;
    this.setState(newState, this.props.updateSize(e, this.state.form));
  }

  render() {

    let marginLeft = -(this.state.position * this.state.moveAmount) + "px";
    let className = `SizeForm flex ai-fe ${this.props.size}`;

    return (
      <div className={className}>
        <div className="img-wrapper flex ai-c">
          <img src={getAsset('left-arrow')} onClick={this.moveLeft} />
        </div>
        <div className="form-wrapper" style={{maxWidth: this.state.maxWidth}}>
          <div id="move-frame" className="flex ai-fe" style={{marginLeft: marginLeft}}>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XS ? colored : null}>XS</label>
              {this.props.edit ? (
                <input type="text" name="XS" style={this.props.form.XS ? colored : null}
                  value={this.props.form.XS} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XS ? colored : null}>{this.props.form.XS || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.S ? colored : null}>S</label>
              {this.props.edit ? (
                <input type="text" name="S" style={this.props.form.S ? colored : null}
                  value={this.props.form.S} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.S ? colored : null}>{this.props.form.S || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.M ? colored : null}>M</label>
              {this.props.edit ? (
                <input type="text" name="M" style={this.props.form.M ? colored : null}
                  value={this.props.form.M} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.M ? colored : null}>{this.props.form.M || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.L ? colored : null}>L</label>
              {this.props.edit ? (
                <input type="text" name="L" style={this.props.form.L ? colored : null}
                  value={this.props.form.L} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.L ? colored : null}>{this.props.form.L || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL ? colored : null}>XL</label>
              {this.props.edit ? (
                <input type="text" name="XL" style={this.props.form.XL ? colored : null}
                  value={this.props.form.XL} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL ? colored : null}>{this.props.form.XL || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL2 ? colored : null}>2XL</label>
              {this.props.edit ? (
                <input type="text" name="XL2" style={this.props.form.XL2 ? colored : null}
                  value={this.props.form.XL2} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL2 ? colored : null}>{this.props.form.XL2 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL3 ? colored : null}>3XL</label>
              {this.props.edit ? (
                <input type="text" name="XL3" style={this.props.form.XL3 ? colored : null}
                  value={this.props.form.XL3} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL3 ? colored : null}>{this.props.form.XL3 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL4 ? colored : null}>4XL</label>
              {this.props.edit ? (
                <input type="text" name="XL4" style={this.props.form.XL4 ? colored : null}
                  value={this.props.form.XL4} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL4 ? colored : null}>{this.props.form.XL4 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL5 ? colored : null}>5XL</label>
              {this.props.edit ? (
                <input type="text" name="XL5" style={this.props.form.XL5 ? colored : null}
                  value={this.props.form.XL5} onChange={this.update} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL5 ? colored : null}>{this.props.form.XL5 || 0}</h1>
              )}
            </div>
          </div>
        </div>
        <div className="img-wrapper flex ai-c">
          <img src={getAsset('right-arrow')} onClick={this.moveRight} />
        </div>
        <div className="form-wrapper total-form-wrapper flex ai-fe">
          <div className="circle-display total-circle flex jc-c">
            <label>TOTAL</label>
            <div className="circle-quantity flex jc-c ai-c">{this.props.form.quantity}</div>
          </div>
        </div>
      </div>
    );
  }
}

function convertPxToNum(str) {
  return Number(str.substring(0, str.length - 2));
}

const colored = {
  color: "#44B1DE"
}

export default SizeForm;
