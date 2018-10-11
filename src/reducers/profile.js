const fetchingProfileReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
    }
};

const fetchProfileSuccessReducer = function(state, {status, data}) {
	return {
		...state,
		...{ status, data }
	}
};

const fetchProfileErrorReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			error: data
		}
	}
};

const profileReducer = function(state={}, action) {
	switch (action.type) {
		case 'FETCHING_PROFILE':
			return fetchingProfileReducer(state, action)
		case 'FETCH_PROFILE_SUCCESS':
			return fetchProfileSuccessReducer(state, action)
		case 'FETCH_PROFILE_ERROR':
			return fetchProfileErrorReducer(state, action)
		default:
            return state
    }
};

export default profileReducer;