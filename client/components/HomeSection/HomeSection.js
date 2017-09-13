import React, { Component } from 'react';
import grayArrow from '../../src/light-gray-arrow.svg';
import './HomeSection.scss';

class HomeSection extends Component { 
  render() {

    var icons = this.props.section.icons.map((icon, i) => {
      return (
        <div style={{width: this.props.section.iconWidth}} className="icon" key={i}>
          <img src={icon.image} />
          <h2>{icon.description}</h2>
        </div>
      );
    });

    var taglines = this.props.section.taglines.map((tagline, i) => {
      return (
        <h3 key={i} style={{
          width: this.props.section.tagsize,
          textAlign: this.props.section.align
        }}>{tagline}</h3>
      );
    });

    return (
      <div className="HomeSection">
        <h1>{this.props.section.header}</h1>
        <div className="icons">
          {icons}
        </div>
        <div className="no-mans-land"></div>
        <div className="bottom">
          <div className="prompt">
            <h4>{this.props.section.prompt}</h4>
            <img src={grayArrow} />
          </div>
          <div className="taglines">
            {taglines}
          </div>
        </div>
      </div>
    );
  }
}

export default HomeSection;
