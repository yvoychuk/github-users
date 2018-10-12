const fetchingFollowersReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
    }
};

const fetchFollowersSuccessReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
	}
};

const fetchFollowersErrorReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			error: data
		}
	}
};

const followersReducer = function(state={}, action) {
	switch (action.type) {
		case 'FETCHING_FOLLOWERS':
			return fetchingFollowersReducer(state, action)
		case 'FETCH_FOLLOWERS_SUCCESS':
			return fetchFollowersSuccessReducer(state, action)
		case 'FETCH_FOLLOWERS_ERROR':
			return fetchFollowersErrorReducer(state, action)
		default:
            return state
    }
};

export default followersReducer;