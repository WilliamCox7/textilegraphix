import { combineReducers } from './packages';
import products from './reducers/products';
import cart from './reducers/cart';
import builder from './reducers/builder';

export default combineReducers({
  products, cart, builder
});
