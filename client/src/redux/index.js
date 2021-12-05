import { combineReducers } from 'redux';

import userReducer from './users';
import contactReducer from './contacts';

const rootReducer = combineReducers({
   user: userReducer,
   contact: contactReducer
})

export default rootReducer;