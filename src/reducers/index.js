import { combineReducers } from 'redux';

// Import custom components
import orderReducer from './order';

const rootReducer = combineReducers({
  order: orderReducer
});

export default rootReducer;
