import { startDrag } from './start-drag';
import { stopDrag } from './stop-drag';
import { drag } from './drag';
import { snap } from './snap';

export function construct(PrintArea) {

  PrintArea.state = {
    dragging: false,
    mousePos: undefined,
    width: undefined,
    edge: undefined,
    vertCenter: undefined,
    horCenter: undefined
  }

  PrintArea.startDrag = startDrag.bind(PrintArea);
  PrintArea.stopDrag = stopDrag.bind(PrintArea);
  PrintArea.drag = drag.bind(PrintArea);
  PrintArea.snap = snap.bind(PrintArea);

}
