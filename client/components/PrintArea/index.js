import { React, Component, Draggable } from '../../packages';
import { closeXRed, resize } from '../../assets';
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
    let clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    let parent = e.target.tagName === 'I' ? e.target.parentElement.parentElement : e.target.parentElement;
    this.setState({dragging: true, mousePos: clientY, width: parent.clientWidth});
  }

  stopDrag(e) {
    this.setState({dragging: false, mousePos: undefined, width: undefined});
  }

  drag(e) {
    let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    let parent = e.target.tagName === 'I' ? e.target.parentElement.parentElement : e.target.parentElement;
    if (this.state.dragging) {
      var newWidth = this.state.width - (this.state.mousePos - clientY);
      if (newWidth < 254 && parent.getBoundingClientRect().right <= this.state.edge) {
        parent.style.width = newWidth + 'px';
      }
    }
    e.preventDefault();
    return false;
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
            <img src={resize} className="resizer" onTouchStart={this.startDrag} onDragStart={this.startDrag} draggable="true"
              onDragEnd={this.stopDrag} onTouchEnd={this.stopDrag} onDrag={this.drag} onTouchMove={this.drag} />
            <img src={closeXRed} className="close" onClick={() => this.props.removeImage(image.index)} style={this.state.dragging ? {
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

export default PrintArea;
