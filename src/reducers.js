export function reducer(state, action) {
	switch (action.type) {
		case 'FETCHING_USERS':
			return {
				...state,
				...{ status: action.status }
			}
		case 'FETCH_USERS_SUCCESS':
			return {
				...state,
				...{ 
					status: action.status,
					users: action.data
				}
			}
		case 'FETCH_USERS_ERROR':
			return {
				...state,
				...{ 
					status: action.status,
					usersError: action.data
				}
			}
		case 'FETCHING_USER':
			return {
				...state,
				...{ 
					status: action.status,
					user: undefined
				}
			}
		case 'FETCH_USER_SUCCESS':
			return {
				...state,
				...{ 
					status: action.status,
					user: action.data
				}
			}
		case 'FETCH_USER_ERROR':
			return {
				...state,
				...{ 
					status: action.status,
					userError: action.data
				}
			}
		default:
			return state
	}
}