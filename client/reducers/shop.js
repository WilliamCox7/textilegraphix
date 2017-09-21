const SET = 'shop/SET';

const initState = {
  products: [
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Long Sleeve Shirt',
      number: 22104,
      type: 'long sleeve shirt'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Collared Shirt',
      number: 22104,
      type: 'collared shirt'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Hoodies',
      number: 22104,
      type: 'hoodies'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Other',
      number: 22104,
      type: 'other'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Hoodies',
      number: 22104,
      type: 'hoodies'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'Originals',
      number: 22104,
      type: 'originals'
    },
    {
      image: 'http://pngimg.com/uploads/tshirt/tshirt_PNG5448.png',
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts'
    }
  ]
};

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