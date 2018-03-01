const SET = 'product/SET';
const SET_COLOR = 'product/SET_COLOR';
const TOG_TYPE = 'product/TOG_TYPE';
const SIZE = "product/SIZE";
const TOG_LOC = 'product/TOG_LOC';
const DEC = 'product/DEC';
const INC = 'product/INC';
const RESET = 'product/RESET';
const ADD_UPL = 'product/ADD_UPL';
const REM_UPL = 'product/REM_UPL';
const RES_UPL = 'product/RES_UPL';
const SET_TIT = 'product/SET_TIT';
const UPD_IND = 'product/UPD_IND';
const RES_MUN = 'nav/RES_MUN';

const initState = {
  XS: '',
  SM: '',
  M: '',
  L: '',
  XL: '',
  XL2: '',
  XL3: '',
  XL4: '',
  front: true,
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
  subtotal: 0,
  uploaded: {},
  mockup: {
    titles: ['front'],
    views: [0],
    index: 0,
    length: 1
  }
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
  front: true,
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
  subtotal: 0,
  uploaded: {},
  mockup: {
    titles: ['front'],
    views: [0],
    index: 0,
    length: 1
  }
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.brand = action.payload.brand;
      editState.image = action.payload.image;
      editState.images = action.payload.images;
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
    case ADD_UPL:
      action.image.id = editState.uploaded[action.index].length+1;
      editState.uploaded[action.index].push(action.image);
      return Object.assign({}, state, editState);
    case REM_UPL:
      editState.uploaded[action.index].forEach((image, i) => {
        if (image.id === action.id) {
          editState.uploaded[action.index].splice(i, 1);
        }
      });
      return Object.assign({}, state, editState);
    case RES_UPL:
      editState.uploaded[0] = [];
      editState.uploaded[1] = [];
      editState.uploaded[2] = [];
      editState.uploaded[3] = [];
      editState.uploaded[4] = [];
      return Object.assign({}, state, editState);
    case SET_TIT:
      var newViews = [], newTitles = [], newIndex, count = 0;
      action.titles.forEach((title, i) => {
        if (title.display) {
          var text = title.text;
          title.text === "leftSleeve" ? text = "left sleeve" : title.text;
          title.text === "rightSleeve" ? text = "right sleeve" : title.text;
          newTitles.push(text);
          if (title.text === action.changed) {
            newIndex = count;
          }
          count++;
        }
      });
      action.titles[0].display ? newViews.push(0) : null;
      action.titles[1].display ? newViews.push(1) : null;
      action.titles[2].display ? newViews.push(2) : null;
      action.titles[3].display ? newViews.push(3) : null;
      action.titles[4].display ? newViews.push(4) : null;
      editState.mockup.titles = newTitles;
      editState.mockup.views = newViews;
      editState.mockup.length = newViews.length;
      if (editState.mockup.index >= newViews.length) {
        editState.mockup.index--;
        document.getElementById("view-container").style.marginLeft = (newViews.length - 1) * (1 - 326) + "px";
      }
      if (action.adding) {
        editState.mockup.index = newIndex;
        document.getElementById("view-container").style.marginLeft = newIndex * (1 - 326) + "px";
      }
      return Object.assign({}, state, editState);
    case UPD_IND:
      editState.mockup.index = action.payload;
      return Object.assign({}, state, editState);
    case RES_MUN:
      editState.mockup.titles = ['front'];
      editState.mockup.views = [0];
      editState.mockup.index = 0;
      editState.mockup.length = 1;
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

export function addImage(image, index) {
  return {
    type: ADD_UPL,
    image: image,
    index: index
  }
}

export function removeImage(id, index) {
  return {
    type: REM_UPL,
    id: id,
    index: index
  }
}

export function resetModal() {
  return {
    type: RES_UPL
  }
}

export function setTitles(titles, adding, changed) {
  return {
    type: SET_TIT,
    titles: titles,
    adding: adding,
    changed: changed
  }
}

export function updateViewIndex(index) {
  return {
    type: UPD_IND,
    payload: index
  }
}

export function resetMockupNav() {
  return {
    type: RES_MUN
  }
}
