const INIT = 'builder/INIT';
const CLOSE = 'builder/CLOSE';
const REP_IMG = 'builder/REP_IMG';

const initState = {
  init: undefined,
  product: undefined,
  show: false,
  edit: false
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case INIT:
      editState.init = action.init;
      editState.product = action.product;
      editState.show = true;
      editState.edit = action.edit;
      return Object.assign({}, state, editState);

    case CLOSE:
      editState.init = undefined;
      editState.product = undefined;
      editState.show = false;
      document.getElementById('current-page').style.position = 'relative';
      document.getElementById('current-page').style.opacity = 1;
      return Object.assign({}, state, editState);

    case REP_IMG:
      editState.product.images[action.hex][action.index] = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function initBuilder(init, product, edit) {
  return {
    type: INIT,
    init: init,
    product: product,
    edit: edit
  }
}

export function closeBuilder() {
  return {
    type: CLOSE
  }
}

export function replaceImage(data, hex, index) {
  return {
    type: REP_IMG,
    payload: data,
    hex: hex,
    index: index
  }
}
