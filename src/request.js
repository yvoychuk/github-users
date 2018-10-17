import { get } from 'axios';

export const githubEndpoint = 'https://api.github.com';

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

export const getProfile = (login) => get(`${githubEndpoint}/users/${login}`);

export const getFollowers = (url) => get(url);

export const getFollowing = (login) => get(`${githubEndpoint}/users/${login}/following`);