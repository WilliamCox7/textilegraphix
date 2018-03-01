import { React, Component, connect, Draggable } from '../../packages';
import { removeImage } from '../../reducers/product';
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
    var area = document.getElementsByClassName(
      !this.props.edit ? "PrintArea" : "PrintAreaHover")[0];
    var areaSpecs = area.getBoundingClientRect();
    var edge = areaSpecs.right + 1;
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
      if (newWidth < 200 && e.target.parentElement.getBoundingClientRect().right <= this.state.edge) {
        e.target.parentElement.style.width = newWidth + 'px';
      }
    }
    e.preventDefault();
    return false;
  }

  snap(e) {
    if (this.props.edit) {
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
  }

  render() {

    var images = {
      0: [], 1: [], 2: [], 3: [], 4: []
    };

    for (var index in this.props.product.uploaded) {
      this.props.product.uploaded[index].map((image, i) => {
        image.index = index;
        images[index].push(
          <Draggable key={index + image.id} bounds="parent" onDrag={this.snap} cancel={this.props.edit ? "span" : "div"}>
            <div>
              <div className="image-wrapper">
                <img src={image.src} draggable="false" />
              </div>
              {!this.props.edit ? null : (
                <span className="resizer" onDragStart={this.startDrag} draggable="true"
                  onDragEnd={this.stopDrag} onDrag={this.drag}></span>
              )}
              {!this.props.edit ? null : (
                <span className="close" onClick={() => this.props.removeImage(image.id, image.index)}>X</span>
              )}
            </div>
          </Draggable>
        );
      });
    }

    return (
      <div className={!this.props.edit ? "PrintArea" : "PrintAreaHover"}>
        {!this.props.edit ? null : (<div className="title">Print Area</div>)}
        {images[this.props.view]}
        {!this.props.edit ? null : (
          <div className="guides">
            <div className="guide-box"></div>
            <div className="guide-box"></div>
            <div className="guide-box"></div>
            <div className="guide-box"></div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    product: state.product
  }
}

const mapDispatchToProps = {
  removeImage: removeImage
}

export default connect(mapStateToProps, mapDispatchToProps)(PrintArea);
