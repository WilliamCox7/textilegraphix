const ADD = 'cart/ADD';

const initState = {
  products: [],
  subtotal: 0
}

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {
    case ADD:
      editState.products.push(action.payload);
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