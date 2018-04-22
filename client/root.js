import { combineReducers } from './packages';
import products from './reducers/products';
import cart from './reducers/cart';

export default combineReducers({
  products, cart
});
