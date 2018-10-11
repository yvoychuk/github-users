import { getProfile, withStatus } from '../request';

const fetchProfile = (name) => {
	return (dispatch) => {
		dispatch(fetchingProfile());
		return getProfile(name)
			.then((response) => {dispatch(fetchProfileSuccess(response.data))})
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