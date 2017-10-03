import React, { Component } from 'react';
import './Draggable.scss';

class Draggable extends Component {

  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onMouseDown(e) {
    if (e.target.className !== 'resizer') {
      this.props.updateDragging(this.props.image.id, true);
    }
  }

  onMouseUp(e) {
    this.props.updateDragging(this.props.image.id, false);
  }
  
  onDragStart(e) {
    var nodeStyle = this.refs.node.style;
    e.dataTransfer.setData('application/json', JSON.stringify({
      id: this.props.image.id,
      x: e.clientX - parseInt(nodeStyle.left),
      y: e.clientY - parseInt(nodeStyle.top),
    }));
  }

  onDragEnd(e) {
    this.props.updateDragging(this.props.image.id, false);
  }

  render() {
    return (
      <div className="Draggable" draggable={this.props.image.isDragging} 
        style={{ top: this.props.image.top, left: this.props.image.left, 
        width: this.props.image.width }} onMouseDown={this.onMouseDown} 
        onMouseUp={this.onMouseUp} onDragStart={this.onDragStart} 
        onDragEnd={this.onDragEnd} ref={"node"}>
        <img src={this.props.image.src} />
        <div className="resizer"></div>
      </div>
    );
  }
}

export default Draggable;
