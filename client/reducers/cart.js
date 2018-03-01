const SET = 'cart/SET';
const ADD = 'cart/ADD';
const UPD_IND = 'cart/UPD_IND';

const initState = {
  products: [],
  subtotal: 0
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case SET:
      editState.products = action.payload;
      return Object.assign({}, state, editState);
    case ADD:
      editState.products.push(action.payload);
      return Object.assign({}, state, editState);
    case UPD_IND:
      editState.products.forEach((product, i) => {
        if (action.guid === product.guid) {
          editState.products[i].mockup.index = action.index;
        }
      });
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function setCart(cart) {
  return {
    type: SET,
    payload: cart
  }
}

export function add(product) {
  return {
    type: ADD,
    payload: product
  }
}

export function updateCartViewIndex(index, guid) {
  return {
    type: UPD_IND,
    index: index,
    guid: guid
  }
}
