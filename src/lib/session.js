import { browser } from '$app/env';
import { user } from '$lib/stores/index.js';
import { server } from './variables';

const PROTECTED_ROUTES = ['/account'];

let userValue;
user.subscribe((value) => {
	console.log('userValue', value);
	userValue = value;
});

export const routeGuard = (slug) => {
	console.log('routeGuard', slug, userValue);
	if (PROTECTED_ROUTES.includes(slug) && !userValue) {
		alert('Please sign in first to access current page.');
		document.location.href = '/';
	} else {
		return true;
	}
};

export const setSession = async () => {
	console.log('setSession');
	const user = await getSessionUser();

	if (user) {
		setUserValue(user);
		return true;
	} else {
		return false;
	}
};

export const getSessionUser = async () => {
	console.log('getSessionUser');
	if (browser) {
		const token = localStorage.token;
		if (token) {
			const user = await fetch(`${server}/auth`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: token
				}
			})
				.then(async (res) => {
					if (!res.ok) throw await res.json();
					return await res.json();
				})
				.catch((err) => {
					console.log('ERROR', err);
					// removes token when an error occurs
					localStorage.removeItem('token');
					return null;
				});
			return user;
		}
	}

	return null;
};

const setUserValue = (_user) => {
	if (_user) {
		user.update(() => ({
			email: _user.email,
			name: _user.name
		}));
	} else {
		user.update(() => false);
	}
};
