const INIT = 'builder/INIT';

const initState = {};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case INIT:
      return Object.assign({}, state, editState, action.payload);

    default: return state;

  }
}

export function initializeBuilder(init, product) {
  return {
    type: INIT,
    payload: {
      build: init,
      product: product
    }
  }
}
