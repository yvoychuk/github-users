import { get } from 'axios';

const githubEndpoint = 'https://api.github.com';

export const statusCodes = {
	100: 'processing',
	200: 'ok',
	400: 'error'
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

export const getProfile = (name) => get(`${githubEndpoint}/users/${name}`);

export const withStatus = (state, status) => {
	return {
		...state,
		status: {
			message: statusCodes[status],
			code: status
		}
	}
}