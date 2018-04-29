const ADD = 'cart/ADD';
const UPD = 'cart/UPD';
const REM = 'cart/REM';

const initState = {
  orders: []
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case ADD:
      editState.orders.push(action.payload);
      return Object.assign({}, state, editState);

    case UPD:
      editState.orders.forEach((order, i) => {
        if (order.guid === action.payload.guid) {
          editState.orders[i] = action.payload;
        }
      });
      return Object.assign({}, state, editState);

    case REM:
      editState.orders.forEach((order, i) => {
        if (order.guid === action.payload) {
          editState.orders.splice(i, 1);
        }
      });
      return Object.assign({}, state, editState);

    default: return state;

  }
}

export function addOrder(order) {
  return {
    type: ADD,
    payload: order
  }
}

export function updOrder(order) {
  return {
    type: UPD,
    payload: order
  }
}

export function removeOrder(guid) {
  return {
    type: REM,
    payload: guid
  }
}
