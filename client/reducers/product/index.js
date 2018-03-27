const SET = 'product/SET';

const initState = {

}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case SET:
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function set() {
  return {
    type: SET
  }
}
