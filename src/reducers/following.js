const fetchingFollowingReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
    }
};

const fetchFollowingSuccessReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
	}
};

const fetchFollowingErrorReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			error: data
		}
	}
};

const followingReducer = function(state={}, action) {
	switch (action.type) {
		case 'FETCHING_FOLLOWING':
			return fetchingFollowingReducer(state, action)
		case 'FETCH_FOLLOWING_SUCCESS':
			return fetchFollowingSuccessReducer(state, action)
		case 'FETCH_FOLLOWING_ERROR':
			return fetchFollowingErrorReducer(state, action)
		default:
            return state
    }
};

export default followingReducer;