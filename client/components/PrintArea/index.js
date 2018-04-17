import { React, Component, Draggable } from '../../packages';
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
  }

  componentDidMount() {
    var area = document.getElementsByClassName("PrintArea")[0];
    var areaSpecs = area.getBoundingClientRect();
    var edge = areaSpecs.right + 1;
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
      if (newWidth < 262 && e.target.parentElement.getBoundingClientRect().right <= this.state.edge) {
        e.target.parentElement.style.width = newWidth + 'px';
      }
    }
    e.preventDefault();
    return false;
  }

  render() {

    let images = this.props.uploaded.map((image, i) => {
      image.index = i;
      return (
        <Draggable key={i} bounds="parent" cancel="span">
          <div>
            <div className="image-wrapper">
              <img src={image.src} draggable="false" />
            </div>
            <span className="resizer" onDragStart={this.startDrag} draggable="true"
              onDragEnd={this.stopDrag} onDrag={this.drag}></span>
            <span className="close" onClick={() => this.props.removeImage(image.index)}>X</span>
          </div>
        </Draggable>
      );
    });

    return (
      <div className="PrintArea">
        {images}
      </div>
    );
  }
}

export default PrintArea;
