import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import admin from './admin';
import user from './user';

export default combineReducers({ alert, auth, admin, user });
