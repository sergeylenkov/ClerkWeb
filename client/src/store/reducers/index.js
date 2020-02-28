import { combineReducers } from 'redux';
import user from './user';
import data from './data';

export default combineReducers({
  user,
  data
})