import React, { Component } from 'react';
import { upArrow, downArrow } from '../../assets';
import './Summary.scss';

function format0s(value) {
  var zeroes = new Array(4).join("0");
  return (zeroes + value).slice(-3);
}

class Summary extends Component {

  constructor() {
    super();
    this.state = {
      isActive: false
    }
    this.toggleArrow = this.toggleArrow.bind(this);
  }

  toggleArrow() {
    this.setState({isActive: !this.state.isActive});
  }

  render() {
    return (
      <div className="Summary">
        {this.state.isActive ? (
          <img onClick={this.toggleArrow} src={upArrow} />
        ) : (
          <img onClick={this.toggleArrow} src={downArrow} />
        )}
        <div className="info">
          <h1 onClick={this.toggleArrow} >
            {this.props.summary.brand.toUpperCase()} {this.props.summary.number}
          </h1>
          {this.state.isActive ? (
            <div className="info-content">
              <div className="info-section">
                <div className="column1">
                  <h2>Size</h2>
                  <h3>XS</h3>
                  <h3>SM</h3>
                  <h3>M</h3>
                  <h3>L</h3>
                  <h3>XL</h3>
                  <h3>2XL</h3>
                  <h3>3XL</h3>
                  <h3>4XL</h3>
                </div>
                <div className="column2">
                  <h2>Quantity</h2>
                  <h3>{format0s(this.props.summary.XS)}</h3>
                  <h3>{format0s(this.props.summary.SM)}</h3>
                  <h3>{format0s(this.props.summary.M)}</h3>
                  <h3>{format0s(this.props.summary.L)}</h3>
                  <h3>{format0s(this.props.summary.XL)}</h3>
                  <h3>{format0s(this.props.summary.XL2)}</h3>
                  <h3>{format0s(this.props.summary.XL3)}</h3>
                  <h3>{format0s(this.props.summary.XL4)}</h3>
                </div>
              </div>
              <div className="info-section">
                <div className="column1">
                  <h2>Colors</h2>
                  <h3>Front</h3>
                  <h3>Back</h3>
                  <h3>Bottom</h3>
                  <h3>Right Sleeve</h3>
                  <h3>Left Sleeve</h3>
                </div>
                <div className="column2">
                  <h2></h2>
                  <h3>{this.props.summary.colorFront}</h3>
                  <h3>{this.props.summary.colorBack}</h3>
                  <h3>{this.props.summary.colorBottom}</h3>
                  <h3>{this.props.summary.colorRightSleeve}</h3>
                  <h3>{this.props.summary.colorLeftSleeve}</h3>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Summary;
