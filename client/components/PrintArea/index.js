import { React, Component, Draggable } from '../../packages';
import { getAsset } from '../../modules';
import './style.scss';

import * as method from './methods';

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
            <img src={getAsset('resize')} className="resizer" onTouchStart={this.startDrag} draggable="true"
               onTouchEnd={(e) => this.stopDrag(e, image.index, this.props.side)} onTouchMove={this.drag} />
            <img src={getAsset('close-x-red')} className="close" onClick={() => this.props.removeImage(image.index)} style={this.state.dragging ? {
              "display": "block"
            } : null} />
          </div>
        </Draggable>
      );
    });

    return (
      <div className="PrintArea" style={this.state.dragging ? {
        "background": "rgba(255, 255, 255, 0.7)",
        "border": "solid 3px #E6E6E6"
      } : null}>
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
