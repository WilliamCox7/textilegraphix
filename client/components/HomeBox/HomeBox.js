import React, { Component } from 'react';
import display from '../../src/home-display.png';
import blueArrow from '../../src/blue-arrow.svg';
import grayArrow from '../../src/gray-arrow.svg';
import './HomeBox.scss';

class HomeBox extends Component {

  constructor() {
    super();
    this.state = {
      hoverStart: false,
      hoverLearn: false
    }
    this.setHover = this.setHover.bind(this);
  }

  setHover(type) {
    var key = "hover" + type;
    var newState = Object.assign({}, this.state);
    newState[key] = !this.state[key];
    this.setState(newState);
  }

  render() {
    return (
      <div className="HomeBox">
        <img src={display} />
        <div className="links">
          <div onMouseOver={() => {this.setHover("Start");}}
            onMouseOut={() => {this.setHover("Start");}} className="link">
            <h1>Get Started</h1>
            {this.state.hoverStart ? (
              <img src={blueArrow} />
            ) : (
              <img src={grayArrow} />
            )}
          </div>
          <div onMouseOver={() => {this.setHover("Learn");}}
            onMouseOut={() => {this.setHover("Learn");}} className="link">
            <h1>Learn More</h1>
            {this.state.hoverLearn ? (
              <img src={blueArrow} />
            ) : (
              <img src={grayArrow} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeBox;
