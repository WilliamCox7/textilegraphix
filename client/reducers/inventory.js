const SET = 'inventory/SET';

const initState = {
  products: [
    {
      "id": 1,
      "brand": "Haynes",
      "number": "247NCQY",
      "costOfShirt": 2,
      "type": "t-shirts",
      "rating": "2",
      "quality": "premium",
      "material": "60/40 Blend",
      "weight": 0.3,
      "printArea": [
        {
          "width": "146px",
          "height": "220px",
          "top": "58px",
          "left": "94px"
        },
        {
          "width": "146px",
          "height": "220px",
          "top": "58px",
          "left": "94px"
        }
      ],
      "images": {
        "#283447": [
          "/src/darkblue_front.png",
          "/src/darkblue_back.png"
        ],
        "#000000": [
          "/src/black_front.png",
          "/src/black_back.png"
        ],
        "#F5DE80": [
          "/src/darkblue_front.png",
          "/src/darkblue_back.png"
        ],
        "#708BC4": [
          "/src/lightblue_front.png",
          "/src/lightblue_back.png"
        ],
        "#C3163A": [
          "/src/red_front.png",
          "/src/red_back.png"
        ],
        "#F5DE80": [
          "/src/yellow_front.png",
          "/src/yellow_back.png"
        ],
      },
      "colors": [
        {
          "productId": 1,
          "hex": "#283447",
          "name": "Dark Blue"
        },
        {
          "productId": 1,
          "hex": "#708BC4",
          "name": "Light Blue"
        },
        {
          "productId": 1,
          "hex": "#000000",
          "name": "Black"
        },
        {
          "productId": 1,
          "hex": "#C3163A",
          "name": "Red"
        },
        {
          "productId": 1,
          "hex": "#F5DE80",
          "name": "Yellow"
        },
      ]
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
