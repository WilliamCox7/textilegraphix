const ADD = 'cart/ADD';
const UPD = 'cart/UPD';

let orders = localStorage.getItem('orders');
orders = JSON.parse(orders);
if (!orders) orders = [];

const initState = {
  orders: orders
};

export default function reducer(state=initState, action) {
  let editState = Object.assign({}, state);
  switch(action.type) {

    case ADD:
      editState.orders.push(action.payload);
      localStorage.setItem('orders', JSON.stringify(editState.orders));
      return Object.assign({}, state, editState);

    case UPD:
      editState.orders.forEach((order, i) => {
        if (order.guid === action.payload.guid) {
          editState.orders[i] = action.payload;
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
