import { getFollowers, withStatus } from '../request';

const fetchFollowers = (url) => {
	return (dispatch) => {
		dispatch(fetchingFollowers());
		return getFollowers(url)
			.then((response) => {
				dispatch(fetchFollowersSuccess(response.data))
			})
			.catch((error) => {dispatch(fetchFollowersError(error))})
	} 
}

const fetchingFollowers = () => {
	return withStatus({
		type: 'FETCHING_FOLLOWERS'
	}, 100)
}

const fetchFollowersSuccess = (data) => {
	return withStatus({
		type: 'FETCH_FOLLOWERS_SUCCESS', data
	}, 200)
}

const fetchFollowersError = (data) => {
	return withStatus({
		type: 'FETCH_FOLLOWERS_ERROR', data
	}, 400)
}

export default fetchFollowers;