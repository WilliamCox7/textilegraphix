import { React, Draggable } from '../../../packages';

export function template(PrintArea) {
  var images = PrintArea.props.modal.images.map((image, i) => {
    return (
      <Draggable key={i} bounds="parent" onDrag={PrintArea.snap}
        cancel={PrintArea.props.edit ? "span" : "div"}>
        <div>
          <img src={image.src} draggable="false" />
          {!PrintArea.props.edit ? null : (
            <span className="resizer" onDragStart={PrintArea.startDrag} draggable="true"
              onDragEnd={PrintArea.stopDrag} onDrag={PrintArea.drag}></span>
          )}
          {!PrintArea.props.edit ? null : (
            <span className="close" onClick={() => PrintArea.props.removeImage(image.id)}>X</span>
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
