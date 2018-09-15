import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

class SizeForm extends Component {

  constructor(props) {
    super(props);
    let width = props.size === 'large' ? 97 : 55;
    let limit = props.size === 'large' ? 485 : 270;
    this.state = {
      position: 0 - width,
      width: width,
      limit: limit
    }
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  moveLeft() {
    if (this.state.position < 0) {
      this.setState({position: this.state.position + this.state.width});
    }
  }

  moveRight() {
    if (this.state.position > (0 - this.state.limit)) {
      this.setState({position: this.state.position - this.state.width});
    }
  }

  render() {

    let marginLeft = this.state.position + "px";
    let maxWidth = this.props.size === 'large' ? "388px" : "222px";
    let className = `SizeForm flex ai-fe ${this.props.size}`;

    return (
      <div className={className}>
        <div className="img-wrapper flex ai-c">
          <img src={getAsset('left-arrow')} onClick={this.moveLeft} />
        </div>
        <div className="form-wrapper" style={{maxWidth: maxWidth}}>
          <div id="move-frame" className="flex ai-fe" style={{marginLeft: marginLeft}}>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XS ? colored : null}>XS</label>
              {this.props.edit ? (
                <input type="text" name="XS" style={this.props.form.XS ? colored : null}
                  value={this.props.form.XS} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XS ? colored : null}>{this.props.form.XS || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.S ? colored : null}>S</label>
              {this.props.edit ? (
                <input type="text" name="S" style={this.props.form.S ? colored : null}
                  value={this.props.form.S} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.S ? colored : null}>{this.props.form.S || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.M ? colored : null}>M</label>
              {this.props.edit ? (
                <input type="text" name="M" style={this.props.form.M ? colored : null}
                  value={this.props.form.M} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.M ? colored : null}>{this.props.form.M || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.L ? colored : null}>L</label>
              {this.props.edit ? (
                <input type="text" name="L" style={this.props.form.L ? colored : null}
                  value={this.props.form.L} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.L ? colored : null}>{this.props.form.L || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL ? colored : null}>XL</label>
              {this.props.edit ? (
                <input type="text" name="XL" style={this.props.form.XL ? colored : null}
                  value={this.props.form.XL} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL ? colored : null}>{this.props.form.XL || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL2 ? colored : null}>XL2</label>
              {this.props.edit ? (
                <input type="text" name="XL2" style={this.props.form.XL2 ? colored : null}
                  value={this.props.form.XL2} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL2 ? colored : null}>{this.props.form.XL2 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL3 ? colored : null}>XL3</label>
              {this.props.edit ? (
                <input type="text" name="XL3" style={this.props.form.XL3 ? colored : null}
                  value={this.props.form.XL3} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL3 ? colored : null}>{this.props.form.XL3 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL4 ? colored : null}>XL4</label>
              {this.props.edit ? (
                <input type="text" name="XL4" style={this.props.form.XL4 ? colored : null}
                  value={this.props.form.XL4} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL4 ? colored : null}>{this.props.form.XL4 || 0}</h1>
              )}
            </div>
            <div className="circle-display flex jc-c">
              <label style={this.props.form.XL5 ? colored : null}>XL5</label>
              {this.props.edit ? (
                <input type="text" name="XL5" style={this.props.form.XL5 ? colored : null}
                  value={this.props.form.XL5} onChange={this.props.updateSize} placeholder="0" />
              ) : (
                <h1 style={this.props.form.XL5 ? colored : null}>{this.props.form.XL5 || 0}</h1>
              )}
            </div>
          </div>
        </div>
        <div className="img-wrapper flex ai-c">
          <img src={getAsset('right-arrow')} onClick={this.moveRight} />
        </div>
        <div className="form-wrapper flex ai-fe" style={{maxWidth: maxWidth}}>
          <div className="circle-display total-circle flex jc-c">
            <label>TOTAL</label>
            <div className="circle-quantity flex jc-c ai-c">{this.props.form.quantity}</div>
          </div>
        </div>
      </div>
    );
  }
}

const colored = {
  color: "#44B1DE"
}

export default SizeForm;
