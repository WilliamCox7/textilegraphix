import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLocation } from '../../reducers/nav';
import { Parallax, Background } from 'react-parallax';
import { lightGrayArrow, blueArrow } from '../../assets';
import './HomeSection.scss';

class HomeSection extends Component {

  constructor() {
    super();
    this.state = {
      link: false
    }
    this.setHover = this.setHover.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  setHover() {
    this.setState({link: !this.state.link});
  }

  setLocation(loc) {
    var location = loc;
    this.props.setLocation(location);
  }

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
      <Parallax strength={300} className="HomeSection">
        <h1>{this.props.section.header}</h1>
        <div className="icons">
          {icons}
        </div>
        <div className="no-mans-land"></div>
        <Background>
          <img className="parallax-image" src={this.props.image} />
        </Background>
        <div className="bottom">
          <a className="prompt" href="/#/shop" onClick={() => this.setLocation('shop')}
            onMouseOver={this.setHover} onMouseOut={this.setHover}>
            <h4>{this.props.section.prompt}</h4>
            {this.state.link ? (
              <img src={blueArrow} />
            ) : (
              <img src={lightGrayArrow} />
            )}
          </a>
          <div className="taglines">
            {taglines}
          </div>
        </div>
      </Parallax>
    );
  }
}

const mapDispatchToProps = {
  setLocation: setLocation
}

export default connect(null, mapDispatchToProps)(HomeSection);
