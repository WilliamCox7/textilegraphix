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
  }

  componentDidMount() {
    var area = document.getElementsByClassName("PrintArea")[0];
    var areaSpecs = area.getBoundingClientRect();
    var edge = areaSpecs.right + 1;
    this.setState({edge: edge});
  }

  render() {

    let images = this.props.uploaded.map((image, i) => {
      image.index = i;
      return (
        <Draggable key={i} on bounds="parent" cancel=".resizer">
          <div>
            <div className="image-wrapper" style={this.state.dragging ? {
              "border": "dashed 2px #707070"
            } : null}>
              <img src={image.src} draggable="false" />
            </div>
            <img src={getAsset('resize')} className="resizer" onTouchStart={this.startDrag} onDragStart={this.startDrag} draggable="true"
              onDragEnd={this.stopDrag} onTouchEnd={this.stopDrag} onDrag={this.drag} onTouchMove={this.drag} />
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

export default PrintArea;
