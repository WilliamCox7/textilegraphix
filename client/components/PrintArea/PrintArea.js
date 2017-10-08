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
      edge: undefined,
      vertCenter: undefined,
      horCenter: undefined
    }
    this.startDrag = this.startDrag.bind(this);
    this.stopDrag = this.stopDrag.bind(this);
    this.drag = this.drag.bind(this);
    this.snap = this.snap.bind(this);
  }

  componentDidMount() {
    var area = document.getElementsByClassName("PrintArea")[0];
    var areaSpecs = area.getBoundingClientRect();
    var edge = areaSpecs.right+1;
    var vertCenter = areaSpecs.left + (areaSpecs.width / 2);
    var horCenter = areaSpecs.top + (areaSpecs.height / 2);
    this.setState({edge: edge, vertCenter: vertCenter, horCenter: horCenter});
  }

  startDrag(e) {
    this.setState({dragging: true, mousePos: e.clientY, width: e.target.parentElement.clientWidth});
  }

  stopDrag(e) {
    this.setState({dragging: false, mousePos: undefined, width: undefined});
    var guides = document.getElementsByClassName('guides')[0];
    guides.children[0].style.borderRightColor = '#939598';
    guides.children[1].style.borderLeftColor = '#939598';
    guides.children[2].style.borderRightColor = '#939598';
    guides.children[3].style.borderLeftColor = '#939598';
    guides.children[0].style.borderBottomColor = '#939598';
    guides.children[1].style.borderBottomColor = '#939598';
    guides.children[2].style.borderTopColor = '#939598';
    guides.children[3].style.borderTopColor = '#939598';
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

  snap(e) {
    var guides = document.getElementsByClassName('guides')[0];
    var imageSpecs = e.target.getBoundingClientRect();
    var vertCenter = imageSpecs.left + (imageSpecs.width / 2);
    var horCenter = imageSpecs.top + (imageSpecs.height / 2);
    if (Math.abs(this.state.vertCenter - vertCenter) <= 1) {
      guides.children[0].style.borderRightColor = '#44B1DE';
      guides.children[1].style.borderLeftColor = '#44B1DE';
      guides.children[2].style.borderRightColor = '#44B1DE';
      guides.children[3].style.borderLeftColor = '#44B1DE';
    } else {
      guides.children[0].style.borderRightColor = '#939598';
      guides.children[1].style.borderLeftColor = '#939598';
      guides.children[2].style.borderRightColor = '#939598';
      guides.children[3].style.borderLeftColor = '#939598';
    }
    if (Math.abs(this.state.horCenter - horCenter) <= 1) {
      guides.children[0].style.borderBottomColor = '#44B1DE';
      guides.children[1].style.borderBottomColor = '#44B1DE';
      guides.children[2].style.borderTopColor = '#44B1DE';
      guides.children[3].style.borderTopColor = '#44B1DE';
    } else {
      guides.children[0].style.borderBottomColor = '#939598';
      guides.children[1].style.borderBottomColor = '#939598';
      guides.children[2].style.borderTopColor = '#939598';
      guides.children[3].style.borderTopColor = '#939598';
    }
  }

  render() {

    var images = this.props.modal.images.map((image, i) => {
      return (
        <Draggable key={i} bounds="parent" cancel="span" onDrag={this.snap}>
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
