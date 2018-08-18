import React, { Component } from 'react';
import Draggable from 'react-draggable';
import { getAsset } from '../../modules';
import * as method from './methods';
import './style.scss';

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
    this.onStopMove = this.onStopMove.bind(this);
  }

  componentDidMount() {
    var area = document.getElementsByClassName("PrintArea")[0];
    var areaSpecs = area.getBoundingClientRect();
    var edge = areaSpecs.right + 1;
    this.setState({edge: edge});
    window.addEventListener('touchmove', (e) => {
      if (this.state.dragging || this.props.dragging) e.preventDefault();
    }, { passive: false });
  }

  render() {

    let images = this.props.uploaded.map((image, i) => {
      let position = image.position ? image.position : {x: 0, y: 0};
      return (
        <Draggable key={i} on bounds="parent" cancel=".resizer" defaultPosition={position}
          onStop={(e) => this.onStopMove(e, image.index, this.props.side)} onStart={() => this.props.toggle('dragging')}>
          <div style={{"width": image.width}}>
            <div className="image-wrapper" style={this.state.dragging ? {
              "border": "dashed 2px #707070"
            } : null}>
              <img src={image.src} draggable="false" />
            </div>
            <img src={getAsset('resize')} className="resizer" draggable="true" onTouchStart={this.startDrag}
               onTouchEnd={(e) => this.stopDrag(e, image.index, this.props.side)} onTouchMove={this.drag}
               onDragStart={this.startDrag} onDragEnd={(e) => this.stopDrag(e, image.index, this.props.side)}
               onDrag={this.drag} />
            <img src={getAsset('close-x-red')} className="close" onClick={() => this.props.removeImage(image.index)} style={this.state.dragging ? {
              "display": "block"
            } : null} />
          </div>
        </Draggable>
      );
    });

    let style = Object.assign({}, this.props.printArea);
    if (this.state.dragging) {
      style.background = "rgba(255, 255, 255, 0.7)";
      style.border = "solid 3px #E6E6E6";
    }

    return (
      <div className="PrintArea" style={style}>
        {images}
      </div>
    );
  }
}

PrintArea.prototype.startDrag = method.startDrag;
PrintArea.prototype.stopDrag = method.stopDrag;
PrintArea.prototype.drag = method.drag;
PrintArea.prototype.onStopMove = method.onStopMove;

export default PrintArea;
