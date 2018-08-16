import { combineReducers } from './packages';
import inventory from './reducers/inventory';
import builder from './reducers/builder';

export default combineReducers({
  inventory, builder
});
