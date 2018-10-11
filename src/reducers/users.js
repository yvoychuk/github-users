const fetchingUsersReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			items: data
		}
    }
};

const fetchUsersSuccessReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			items: data
		}
	}
};

const fetchUsersErrorReducer = function(state, {status, data}) {
	return {
		...state,
		...{ 
			status,
			error: data
		}
	}
};

const usersReducer = function(state={}, action) {
	switch (action.type) {
		case 'FETCHING_USERS':
			return fetchingUsersReducer(state, action)
		case 'FETCH_USERS_SUCCESS':
			return fetchUsersSuccessReducer(state, action)
		case 'FETCH_USERS_ERROR':
			return fetchUsersErrorReducer(state, action)
		default:
            return state
    }
};

export default usersReducer;