import React, { Component } from 'react';
import { getAsset } from '../../modules';
import './style.scss';

class WaitIndicator extends Component {
  render() {
    return (
      <div className="WaitIndicator">
        {this.props.waiting ? (
          <div className="waiting-container flex jc-c ai-c">
            <div className="showbox">
              <div className="loader">
                <svg className="circular" viewBox="25 25 50 50">
                  <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
                <img src={getAsset('logo-black')} />
              </div>
              <h1 className="fs-22 fw-bold">{this.props.message}</h1>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default WaitIndicator;
