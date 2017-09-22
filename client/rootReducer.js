import { combineReducers } from 'redux';
import shop from './reducers/shop';
import cart from './reducers/cart';
import nav from './reducers/nav';
import product from './reducers/product';

export default combineReducers({
  shop, cart, nav, product
});
