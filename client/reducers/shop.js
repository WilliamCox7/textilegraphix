import { testShirt } from '../assets';

const SET = 'shop/SET';

const initState = {
  products: [
    {
      image: testShirt,
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Long Sleeve Shirt',
      number: 45535,
      type: 'long sleeve shirt',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Collared Shirt',
      number: 22104,
      type: 'collared shirt',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Hoodies',
      number: 22104,
      type: 'hoodies',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Other',
      number: 22104,
      type: 'other',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Hoodies',
      number: 22104,
      type: 'hoodies',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'Originals',
      number: 22104,
      type: 'originals',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
    },
    {
      image: testShirt,
      brand: 'T-Shirt',
      number: 22104,
      type: 't-shirts',
      colors: ["blue", "purple", "pink"],
      description: 'This lightweight, tubular construction, 100% ring spun combed cotton jersey is the king of t-shirts. 4.3 ounces of slim fit cool right here.'
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
