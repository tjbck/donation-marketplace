import { server } from '$lib/constants';
import { parse, serialize } from 'cookie';

export async function handle({ event, resolve }) {
	console.log(event.url.pathname);

	if (!event.url.pathname.includes('src', 'font')) {
		const cookies = parse(event.request.headers.get('cookie') || '');
		const token = cookies.token;
		console.log('token', token);

		if (token) {
			event.locals.user = await fetch(`${server}/auth`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${token}`
				}
			}).then(async (res) => {
				if (!res.ok) throw await res.json();
				return res.json();
			}).then((json) => {
				return { ...json, token };
			}).catch((err) => {
				console.log('ERROR', err);
				return null;
			});
		}
	}

	const response = await resolve(event);
	return response;
}



/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event){
	return event.locals.user
		? {
				user: {
					// only include properties needed client-side —
					// exclude anything else attached to the user
					// like access tokens etc					
					token: event.locals.user.token,
					id: event.locals.user.id,
					email: event.locals.user.email,
					name: event.locals.user.name,
					coords: event.locals.user.coords,
				}
		  }
		: {};
}
