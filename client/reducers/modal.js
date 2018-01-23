import { test } from '../assets';

const SET = 'modal/SET';
const ADD = 'modal/ADD';
const REM = 'modal/REM';

const initState = {
  open: false,
  images: {
    0: [
      {
        id: 1,
        src: test,
        name: 'test.png'
      }
    ],
    1: [],
    2: [],
    3: [],
    4: []
  }
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.open = action.payload;
      return Object.assign({}, state, editState);
    case ADD:
      action.image.id = editState.images[action.index].length+1;
      editState.images[action.index].push(action.image);
      return Object.assign({}, state, editState);
    case REM:
      editState.images[action.index].forEach((image, i) => {
        if (image.id === action.id) {
          editState.images[action.index].splice(i, 1);
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

export function addImage(image, index) {
  return {
    type: ADD,
    image: image,
    index: index
  }
}

export function removeImage(id, index) {
  return {
    type: REM,
    id: id,
    index: index
  }
}
