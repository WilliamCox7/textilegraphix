const INIT = 'builder/INIT';

const initState = {};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case INIT:
      editState = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function initializeBuilder(order) {
  return {
    type: INIT,
    payload: order
  }
}
