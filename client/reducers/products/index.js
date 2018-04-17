const SET = 'products/SET';

import { products } from './products';

const initState = products;

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case SET:
      editState.products = action.payload;
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function set(products) {
  return {
    type: SET,
    payload: products
  }
}
