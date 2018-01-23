import { React, Draggable } from '../../../packages';

export function template(PrintArea) {
  var images = PrintArea.props.modal.images[PrintArea.props.nav.mockupnav.index].map((image, i) => {
    return (
      <Draggable key={PrintArea.props.nav.mockupnav[PrintArea.props.nav.mockupnav.index] + image.id} position={image.x && image.y ? {x: image.x, y: image.y} : {x: 0, y: 0}} bounds="parent"
        onDrag={(e) => PrintArea.snap(e, image.id)} cancel={PrintArea.props.edit ? "span" : "div"}>
        <div style={image.width ? {width: image.width} : null}>
          <img src={image.src} draggable="false" />
          {!PrintArea.props.edit ? null : (
            <span className="resizer" onDragStart={PrintArea.startDragResizer} draggable="true"
              onDragEnd={PrintArea.stopDragResizer} onDrag={(e) => PrintArea.dragResizer(e, image.id)}></span>
          )}
          {!PrintArea.props.edit ? null : (
            <span className="close" onClick={() => PrintArea.props.removeImage(image.id, PrintArea.props.nav.mockupnav.index)}>X</span>
          )}
        </div>
      </Draggable>
    );
  });

  return (
    <div className={!PrintArea.props.edit ? "PrintArea" : "PrintAreaHover"}>
      {!PrintArea.props.edit ? null : (<div className="title">Print Area</div>)}
      {images}
      {!PrintArea.props.edit ? null : (
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
