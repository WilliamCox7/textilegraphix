const SET = 'modal/SET';
const ADD = 'modal/ADD';
const DROP = 'modal/DROP';
const UPD_DRAG = 'modal/UPD_DRAG';
const UPD_RES = 'modal/UPD_RES';

const initState = {
  open: false,
  images: [
    { 
      id: 1, 
      src: require('../src/logo-blue.svg'),
      isDragging: false, 
      isResizing: false, 
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
    case DROP:
      editState.images.forEach((image, i) => {
        if (image.id === action.id) {
          editState.images[i].top = action.top;
          editState.images[i].left = action.left;
          editState.images[i].isDragging = false;
        }
      });
      return Object.assign({}, state, editState);
    case UPD_DRAG:
      editState.images.forEach((image, i) => {
        if (image.id === action.id) {
          editState.images[i].isDragging = action.isDragging;
        }
      });
      return Object.assign({}, state, editState);
    case UPD_DRAG:
      editState.images.forEach((image, i) => {
        if (image.id === action.id) {
          editState.images[i].isResizing = action.isResizing;
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

export function drop(id, top, left) {
  return {
    type: DROP,
    id: id,
    top: top,
    left: left
  }
}

export function updateDragging(id, isDragging) {
  return {
    type: UPD_DRAG,
    id: id,
    isDragging: isDragging
  }
}

export function updateResizing(id, isResizing) {
  return {
    type: UPD_RES,
    id: id,
    isResizing: isResizing
  }
}