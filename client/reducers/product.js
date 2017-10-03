const SET = 'product/SET';
const SET_COLOR = 'product/SET_COLOR';
const TOG_TYPE = 'product/TOG_TYPE';
const SIZE = "product/SIZE";
const TOG_LOC = 'product/TOG_LOC';
const DEC = 'product/DEC';
const INC = 'product/INC';
const RESET = 'product/RESET';

const initState = {
  XS: '',
  SM: '',
  M: '',
  L: '',
  XL: '',
  XL2: '',
  XL3: '',
  XL4: '',
  front: false,
  back: false,
  bottom: false,
  rightSleeve: false,
  leftSleeve: false,
  colorFront: 0,
  colorBack: 0,
  colorBottom: 0,
  colorLeftSleeve: 0,
  colorRightSleeve: 0,
  color: '',
  isScreen: true,
  subtotal: 0
};

const resetState = {
  XS: '',
  SM: '',
  M: '',
  L: '',
  XL: '',
  XL2: '',
  XL3: '',
  XL4: '',
  front: false,
  back: false,
  bottom: false,
  rightSleeve: false,
  leftSleeve: false,
  colorFront: 0,
  colorBack: 0,
  colorBottom: 0,
  colorLeftSleeve: 0,
  colorRightSleeve: 0,
  color: '',
  isScreen: true,
  subtotal: 0
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.brand = action.payload.brand;
      editState.image = action.payload.image;
      editState.number = action.payload.number;
      editState.type = action.payload.type;
      editState.description = action.payload.description;
      editState.colors = action.payload.colors;
      return Object.assign({}, state, editState);
    case SET_COLOR:
      editState.color = action.payload;
      return Object.assign({}, state, editState);
    case TOG_TYPE:
      editState.isScreen = !editState.isScreen;
      return Object.assign({}, state, editState);
    case SIZE:
      editState[action.size] = action.quantity;
      return Object.assign({}, state, editState);
    case TOG_LOC:
      editState[action.payload] = !editState[action.payload];
      return Object.assign({}, state, editState);
    case DEC:
      var property = action.payload.split("color")[1];
      property = property[0].toLowerCase() + property.substring(1);
      var canToggle = editState[property];
      if (canToggle) {
        if (editState[action.payload] > 0) {
          editState[action.payload] -= 1;
        }
      }
      return Object.assign({}, state, editState);
    case INC:
      var property = action.payload.split("color")[1];
      property = property[0].toLowerCase() + property.substring(1);
      var canToggle = editState[property];
      if (canToggle) {
        editState[action.payload] += 1;
      }
      return Object.assign({}, state, editState);
    case RESET:
      editState = resetState;
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function setProduct(product) {
  return {
    type: SET,
    payload: product
  }
}

export function setColor(color) {
  return {
    type: SET_COLOR,
    payload: color
  }
}

export function toggleType() {
  return {
    type: TOG_TYPE
  }
}

export function updateSize(size, quantity) {
  return {
    type: SIZE,
    size: size,
    quantity: quantity
  }
}

export function toggleLoc(property) {
  return {
    type: TOG_LOC,
    payload: property
  }
}

export function dec(property) {
  return {
    type: DEC,
    payload: property
  }
}

export function inc(property) {
  return {
    type: INC,
    payload: property
  }
}

export function resetProduct() {
  return {
    type: RESET
  }
}