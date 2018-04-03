import { combineReducers } from './packages';
import product from './reducers/product';
import window from './reducers/window';

export default combineReducers({
  product, window
});
