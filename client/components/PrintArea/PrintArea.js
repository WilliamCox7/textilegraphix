import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PrintArea.scss';

//https://codepen.io/kunihiko_sugiura/pen/KgQvKk

class PrintArea extends Component {
  render() {

    var images = this.props.modal.images.map((image, i) => {
      return <img src={image} key={i} />;
    });

    return (
      <div className="PrintArea">
        <div className="title">Print Area</div>
        <div className="area">
          {images}
        </div>
        <div className="guides">
          <div className="guide-box"></div>
          <div className="guide-box"></div>
          <div className="guide-box"></div>
          <div className="guide-box"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  }
}

export default connect(mapStateToProps)(PrintArea);
