const SET = 'nav/SET';

const initState = {
  location: ''
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.location = action.payload;
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function setLocation(location) {
  return {
    type: SET,
    payload: location
  }
}
