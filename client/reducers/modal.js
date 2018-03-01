const SET = 'modal/SET';
const ADD = 'modal/ADD';
const REM = 'modal/REM';
const RES = 'modal/RES';

const initState = {
  open: false,
  images: {}
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
    case RES:
      editState.images[0] = [];
      editState.images[1] = [];
      editState.images[2] = [];
      editState.images[3] = [];
      editState.images[4] = [];
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

export function resetModal() {
  return {
    type: RES
  }
}
