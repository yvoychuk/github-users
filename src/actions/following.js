import { getFollowing, withStatus } from '../request';

const fetchFollowing = (login) => {
	return (dispatch) => {
		dispatch(fetchingFollowing());
		return getFollowing(login)
			.then((response) => {
				dispatch(fetchFollowingSuccess(response.data))
			})
			.catch((error) => {dispatch(fetchFollowingError(error))})
	} 
}

const fetchingFollowing = () => {
	return withStatus({
		type: 'FETCHING_FOLLOWING'
	}, 100)
}

const fetchFollowingSuccess = (data) => {
	return withStatus({
		type: 'FETCH_FOLLOWING_SUCCESS', data
	}, 200)
}

const fetchFollowingError = (data) => {
	return withStatus({
		type: 'FETCH_FOLLOWING_ERROR', data
	}, 400)
}

export default fetchFollowing;