import { combineReducers } from 'redux';
import { errorReducer, successReducer } from './utilityReducer';
import userReducer from './userReducer';
import cabinReducer from './cabinReducer';
import favReducer from './favReducer';
import cabinDetailReducer from './cabinDetailReducer';

const rootReducer = combineReducers({
  userData: userReducer,
  data: cabinReducer,
  cabin: cabinDetailReducer,
  favourite: favReducer,
  succMsg: successReducer,
  error: errorReducer,
});

export default rootReducer;
