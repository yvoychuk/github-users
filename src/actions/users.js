import { getUsers, withStatus } from '../request';

const fetchUsers = (since, perPage) => {
	return (dispatch) => {
		dispatch(fetchingUsers());
		return getUsers(since, perPage)
			.then((response) => {
				dispatch(fetchUsersSuccess(response.data))
			})
			.catch((error) => {dispatch(fetchUsersError(error))})
	} 
}

const fetchingUsers = () => {
	return withStatus({
		type: 'FETCHING_USERS'
	}, 100)
}

const fetchUsersSuccess = (data) => {
	return withStatus({
		type: 'FETCH_USERS_SUCCESS', data
	}, 200)
}

const fetchUsersError = (data) => {
	return withStatus({
		type: 'FETCH_USERS_ERROR', data
	}, 400)
}

export default fetchUsers;