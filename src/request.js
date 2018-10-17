import { get } from 'axios';

export const githubEndpoint = 'https://api.github.com';

const DANGEROUSLY_USED_API_KEY = '9080884332d4deeb4df55c36c9dbfb1eb8d6b921';

export const requestParams = {
	headers: {
		'Authorization': `token ${DANGEROUSLY_USED_API_KEY}`
	}
}

export const statusCodes = {
	100: 'processing',
	200: 'ok',
	400: 'error'
}

export const withStatus = (state, status) => {
	return {
		...state,
		status: {
			message: statusCodes[status],
			code: status
		}
	}
}

export const getUsers = (since, perPage) => get(
	`${githubEndpoint}/users`, 
	{ 
		params: { 
			since,  
			per_page: perPage
		}
	}
);

export const getProfile = (login) => get(`${githubEndpoint}/users/${login}`, requestParams);

export const getFollowers = (url) => get(url, requestParams);

export const getFollowing = (login) => get(`${githubEndpoint}/users/${login}/following`, requestParams);