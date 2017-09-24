const ADD = 'cart/ADD';

const initState = {
  products: [
    {
      brand: 'American Apparel',
      number: 33012,
      XS: 1,
      SM: 32,
      M: 32,
      L: 40,
      XL: 2,
      XL2: 1,
      XL3: 0,
      XL4: 0,
      front: 2,
      back: 2,
      bottom: 0,
      rightSleeve: 1,
      leftSleeve: 0
    },
    {
      brand: 'American',
      number: 45523,
      XS: 1,
      SM: 32,
      M: 32,
      L: 40,
      XL: 2,
      XL2: 1,
      XL3: 0,
      XL4: 0,
      front: 2,
      back: 2,
      bottom: 0,
      rightSleeve: 1,
      leftSleeve: 0
    }
  ],
  subtotal: 0
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case ADD:
      editState.products = action.payload;
      return Object.assign({}, state, editState);
    default: return state;
  }
}

export function add(product) {
  return {
    type: ADD,
    payload: product
  }
}