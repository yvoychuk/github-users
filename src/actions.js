import { getUsers, getUser } from './request';

export const fetchUsers = (since, perPage) => {
	return (dispatch) => {
		dispatch(fetchingUsers());
		return getUsers(since, perPage)
			.then((response) => {dispatch(fetchUsersSuccess(response.data))})
			.catch((error) => {dispatch(fetchUsersFailed(error))})
	} 
}

const fetchingUsers = () => {
	return {
		type: 'FETCHING_USERS',
		status: 'fetchingUsers'
	}
}

const fetchUsersSuccess = (data) => {
	return {
		type: 'FETCH_USERS_SUCCESS',
		status: 'fetchUsersSuccess',
		data
	}
}

const fetchUsersError = (data) => {
	return {
		type: 'FETCH_USERS_ERROR',
		status: 'fetchUsersError',
		data
	}
}

export const fetchUser = (name) => {
	return (dispatch) => {
		dispatch(fetchingUser());
		return getUser(name)
			.then((response) => {dispatch(fetchUserSuccess(response.data))})
			.catch((error) => {dispatch(fetchUserFailed(error))})
	} 
}

const fetchingUser = () => {
	return {
		type: 'FETCHING_USER',
		status: 'fetchingUser'
	}
}

const fetchUserSuccess = (data) => {
	return {
		type: 'FETCH_USER_SUCCESS',
		status: 'fetchUserSuccess',
		data
	}
}

const fetchUserError = (data) => {
	return {
		type: 'FETCH_USER_ERROR',
		status: 'fetchUserError',
		data
	}
}