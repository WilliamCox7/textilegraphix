import { combineReducers } from 'redux';
import inventory from './reducers/inventory';
import builder from './reducers/builder';
import cart from './reducers/cart';

export default combineReducers({
  inventory, builder, cart
});
