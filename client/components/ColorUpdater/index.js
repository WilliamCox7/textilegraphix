import React, { Component } from 'react';
import './style.scss';

class ColorUpdater extends Component {
  render() {
    return (
      <div className="ColorUpdater flex jc-c">
        <label>{this.props.label} Colors</label>
        <div className="button-wrapper flex ai-c jc-c">
          <i className="fas fa-minus" onClick={() => this.props.decrimentColor(this.props.location)}></i>
          <h1>{this.props.numColors}</h1>
          <i className="fas fa-plus" onClick={() => this.props.incrimentColor(this.props.location)}></i>
        </div>
      </div>
    );
  }
}

export default ColorUpdater;
