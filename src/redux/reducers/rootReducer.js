import { combineReducers } from 'redux';
import { errorReducer } from './utilityReducer';
import cabinReducer from './cabinReducer';
import { successReducer } from './utilityReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: cabinReducer,
  error: errorReducer,
  userData: userReducer,
  succMsg: successReducer,
});

export default rootReducer;
