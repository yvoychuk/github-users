import { get } from 'axios';

const githubEndpoint = 'https://api.github.com';

export const getUsers = (since, perPage) => get(
	`${githubEndpoint}/users`, 
	{ 
		params: { 
			since,  
			per_page: perPage
		}
	}
);

export const getUser = (name) => get(`${githubEndpoint}/users/${name}`);