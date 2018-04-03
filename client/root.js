import { combineReducers } from './packages';
import products from './reducers/products';
import window from './reducers/window';

export default combineReducers({
  products, window
});
