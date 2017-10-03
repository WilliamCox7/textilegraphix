import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from '../Draggable/Draggable';
import { drop, updateDragging, updateResizing } from '../../reducers/modal';
import './PrintArea.scss';

//https://codepen.io/kunihiko_sugiura/pen/KgQvKk

class PrintArea extends Component {

  constructor() {
    super();
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.updateDragging = this.updateDragging.bind(this);
    this.updateResizing = this.updateResizing.bind(this);
    this.funcResizing = this.funcResizing.bind(this);
  }

  onDragOver(e) {
    // console.log(e.currentTarget.clientX);
    // console.log(e.currentTarget.clientY);
    // var obj = JSON.parse(e.dataTransfer.getData('application/json'));
    // var top = e.clientY - obj.y;
    // var left = e.clientX - obj.x;
    // console.log(top);
    // console.log(left);
    e.preventDefault();
    return false;
  }

  onDrop(e) {
    var obj = JSON.parse(e.dataTransfer.getData('application/json'));
    var top = e.clientY - obj.y;
    var left = e.clientX - obj.x;
    this.props.drop(obj.id, top, left);
    e.preventDefault();
  }

  updateDragging(id, isDragging){
    this.props.updateDragging(id, isDragging);
  }

  updateResizing(id, isResizing){
    this.props.updateResizing(id, isResizing);
  }

  funcResizing(id, clientX){
    var node = ReactDOM.findDOMNode(this.refs["node_" + id]);
    var images = this.props.modal.images;
    var index = this.props.modal.images.findIndex((item) => item.id == id);
    images[index].width =   clientX - node.offsetLeft + (16 / 2);
    var newState = Object.assign(this.state, {images : images});
    this.setState(newState);
  }

  render() {

    var images = this.props.modal.images.map((image, i) => {
      return (
        <Draggable key={image.id} image={image} 
          updateDragging={this.updateDragging} 
          updateResizing={this.updateResizing} />
      );
    });

    return (
      <div className="PrintArea" onDrop={this.onDrop}
        onDragOver={this.onDragOver}>
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

const mapDispatchToProps = {
  drop: drop,
  updateDragging: updateDragging,
  updateResizing: updateResizing
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintArea);
