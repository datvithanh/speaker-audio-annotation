import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import admin from './admin';
import user from './user';
import team from './team';

export default combineReducers({ alert, auth, admin, user, team });
