import { combineReducers } from './packages';
import shop from './reducers/shop';
import cart from './reducers/cart';
import nav from './reducers/nav';
import product from './reducers/product';
import modal from './reducers/modal';

export default combineReducers({
  shop, cart, nav, product, modal
});
