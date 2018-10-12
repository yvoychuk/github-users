import { getProfile, withStatus } from '../request';
import fetchFollowers from './followers';
import fetchFollowing from './following';

const fetchProfile = (name) => {
	return (dispatch) => {
		dispatch(fetchingProfile());
		return getProfile(name)
			.then((response) => {
				if (typeof response == "undefined") return;
				let {data} = response;
				dispatch(fetchProfileSuccess(response.data))
				if (typeof data == "undefined") return;
				dispatch(fetchFollowers(data.followers_url));
				dispatch(fetchFollowing(data.login));
			})
			.catch((error) => {dispatch(fetchProfileError(error))})
	} 
}

const fetchingProfile = () => {
	return withStatus({
		type: 'FETCHING_PROFILE'
	}, 100)
}

const fetchProfileSuccess = (data) => {
	return withStatus({
		type: 'FETCH_PROFILE_SUCCESS', data
	}, 200)
}

const fetchProfileError = (data) => {
	return withStatus({
		type: 'FETCH_PROFILE_ERROR', data
	}, 400)
}

export default fetchProfile;