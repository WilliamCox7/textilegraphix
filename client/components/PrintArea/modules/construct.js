import { startDragResizer } from './start-drag-resizer';
import { stopDragResizer } from './stop-drag-resizer';
import { dragResizer } from './drag-resizer';
import { snap } from './snap';

export function construct(PrintArea) {

  PrintArea.state = {
    dragging: false,
    mousePos: undefined,
    width: undefined,
    edge: undefined,
    vertCenter: undefined,
    horCenter: undefined,
    defaultX: undefined,
    defaultY: undefined
  }

  PrintArea.startDragResizer = startDragResizer.bind(PrintArea);
  PrintArea.stopDragResizer = stopDragResizer.bind(PrintArea);
  PrintArea.dragResizer = dragResizer.bind(PrintArea);
  PrintArea.snap = snap.bind(PrintArea);

}
