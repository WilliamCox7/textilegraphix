const SET = 'modal/SET';
const ADD = 'modal/ADD';

const initState = {
  open: false,
  images: [
    { 
      id: 1, 
      src: require('../src/test.png'),
      name: 'test.png',
      top: 10, 
      left: 10, 
      width: 100
    }
  ]
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.open = action.payload;
      return Object.assign({}, state, editState);
    case ADD:
      editState.images.push(action.payload);
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function setModal(toggle) {
  return {
    type: SET,
    payload: toggle
  }
}

export function addImage(image) {
  return {
    type: ADD,
    payload: image
  }
}