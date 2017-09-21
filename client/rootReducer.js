import { combineReducers } from 'redux';
import shop from './reducers/shop';
import cart from './reducers/cart';
import nav from './reducers/nav';

export default combineReducers({
  shop, cart, nav
});
