import React, { Component } from 'react';
import { getAsset } from '../../modules';
import * as methods from './methods';
import './style.scss';

class ProductNav extends Component {

  constructor() {
    super();
    this.state = {
      tshirts: '',
      longsleeveshirt: '',
      hoodies: '',
      sweaters: ''
    }
    this.setFilter = this.setFilter.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  render() {
    return (
      <div id="ProductNav">
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('tshirts', 'selected'); this.setFilter('t-shirts');}}
          onMouseEnter={() => this.setStatus('tshirts', 'hovering')}
          onMouseLeave={() => this.setStatus('tshirts', '')}>
          <span className="flex ai-c">
            <img className="icon" src={getAsset('t-shirt-thumb')} />
            <h1>T-SHIRTS</h1>
          </span>
          <img className="radio" src={this.state.tshirts === 'selected' ? (getAsset('radio-filled'))
            : (this.state.tshirts === 'hovering' ? (getAsset('radio-empty')) : '//:0')}
            style={!this.state.tshirts ? {display: 'none'} : null} />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('longsleeveshirt', 'selected'); this.setFilter('long sleeve shirt');}}
          onMouseEnter={() => this.setStatus('longsleeveshirt', 'hovering')}
          onMouseLeave={() => this.setStatus('longsleeveshirt', '')}>
          <span className="flex ai-c">
            <img className="icon" src={getAsset('long-sleeve-thumb')} />
            <h1>LONG SLEEVE</h1>
          </span>
          <img className="radio" src={this.state.longsleeveshirt === 'selected' ? (getAsset('radio-filled'))
            : (this.state.longsleeveshirt === 'hovering' ? (getAsset('radio-empty')) : '//:0')}
            style={!this.state.longsleeveshirt ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('hoodies', 'selected'); this.setFilter('hoodies');}}
          onMouseEnter={() => this.setStatus('hoodies', 'hovering')}
          onMouseLeave={() => this.setStatus('hoodies', '')}>
          <span className="flex ai-c">
            <img className="icon" src={getAsset('hoodie-thumb')} />
            <h1>HOODIES</h1>
          </span>
          <img className="radio" src={this.state.hoodies === 'selected' ? (getAsset('radio-filled'))
            : (this.state.hoodies === 'hovering' ? (getAsset('radio-empty')) : '//:0')}
            style={!this.state.hoodies ? {display: 'none'} : null}  />
        </div>
        <div className="flex jc-sb ai-c" onClick={() => {this.setStatus('sweaters', 'selected'); this.setFilter('sweaters');}}
          onMouseEnter={() => this.setStatus('sweaters', 'hovering')}
          onMouseLeave={() => this.setStatus('sweaters', '')}>
          <span className="flex ai-c">
            <img className="icon" src={getAsset('sweater-thumb')} />
            <h1>SWEATERS</h1>
          </span>
          <img className="radio" src={this.state.sweaters === 'selected' ? (getAsset('radio-filled'))
            : (this.state.sweaters === 'hovering' ? (getAsset('radio-empty')) : '//:0')}
            style={!this.state.sweaters ? {display: 'none'} : null}  />
        </div>
      </div>
    );
  }
}

ProductNav.prototype.setFilter = methods.setFilter;
ProductNav.prototype.setStatus = methods.setStatus;

export default ProductNav;
