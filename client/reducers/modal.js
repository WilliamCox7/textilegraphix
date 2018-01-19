import { test } from '../assets';

const SET = 'modal/SET';
const ADD = 'modal/ADD';
const REM = 'modal/REM';

const initState = {
  open: false,
  images: [
    {
      id: 1,
      src: test,
      name: 'test.png'
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
      action.payload.id = editState.images.length+1;
      editState.images.push(action.payload);
      return Object.assign({}, state, editState);
    case REM:
      editState.images.forEach((image, i) => {
        if (image.id === action.payload) {
          editState.images.splice(i, 1);
        }
      });
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

export function removeImage(id) {
  return {
    type: REM,
    payload: id
  }
}
