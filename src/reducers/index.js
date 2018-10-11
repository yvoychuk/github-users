import { combineReducers } from 'redux';
import usersReducer from './users';
import profileReducer from './profile';

export default combineReducers({
    users: usersReducer,
    profile: profileReducer
});