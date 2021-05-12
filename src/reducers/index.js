import {combineReducers} from 'redux'; //combines the reducers so more than one state can be accessed

import products from './products';
import auth from './auth';
import users from './users';

export const reducers = combineReducers({products, auth, users});