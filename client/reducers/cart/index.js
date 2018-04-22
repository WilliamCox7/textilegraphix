const ADD = 'cart/ADD';

const initState = {
  products: []
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case ADD:
      editState.products.push(action.payload);
      console.log(editState);
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function addProduct(product) {
  return {
    type: ADD,
    payload: product
  }
}
