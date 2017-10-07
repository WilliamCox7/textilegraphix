import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import './PrintArea.scss';

class PrintArea extends Component {

  constructor() {
    super();
    this.state = {
      dragging: false,
      mousePos: undefined,
      width: undefined,
      edge: undefined
    }
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.drag = this.drag.bind(this);
  }

  componentDidMount() {
    var edge = document.getElementsByClassName("PrintArea")[0]
               .getBoundingClientRect().right+1;
    this.setState({edge: edge});
  }

  startDrag(e) {
    this.setState({dragging: true, mousePos: e.clientY, width: e.target.parentElement.clientWidth});
  }

  stopDrag(e) {
    this.setState({dragging: false, mousePos: undefined, width: undefined});
  }

  drag(e) {
    if (this.state.dragging) {
      var newWidth = this.state.width - (this.state.mousePos - e.clientY);
      if (newWidth < 200 && e.target.getBoundingClientRect().right <= this.state.edge) {
        e.target.parentElement.style.width = newWidth + 'px';
      }
    }
    e.preventDefault();
    return false;
  }

  render() {

    var images = this.props.modal.images.map((image, i) => {
      return (
        <Draggable key={image.id} bounds="parent" cancel="span">
          <div>
            <img src={image.src} draggable="false" />
            <span className="resizer" onDragStart={this.startDrag} draggable="true"
              onDragEnd={this.stopDrag} onDrag={this.drag}></span>
          </div>
        </Draggable>
      );
    });

    return (
      <div className="PrintArea">
        <div className="title">Print Area</div>
        {images}
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
