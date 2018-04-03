const SET = 'window/SET';

const initState = {
  w: window.innerWidth
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case SET:
      editState.w = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function set(width) {
  return {
    type: SET,
    payload: width
  }
}
