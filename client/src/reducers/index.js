import { combineReducers } from 'redux';
import auth from './auth';
import admin from './admin';
import user from './user';
import team from './team';

export default combineReducers({ auth, admin, user, team });
