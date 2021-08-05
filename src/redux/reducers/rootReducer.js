import { combineReducers } from 'redux';
import { errorReducer, successReducer } from './utilityReducer';
import cabinReducer from './cabinReducer';

import userReducer from './userReducer';

const rootReducer = combineReducers({
  data: cabinReducer,
  error: errorReducer,
  userData: userReducer,
  succMsg: successReducer,
});

export default rootReducer;
