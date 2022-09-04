import { server } from '$lib/constants';
import { parse, serialize } from 'cookie';

export async function post({ request }) {
	const data = await request.json();
	const { email, password } = data;
	let error = null;

	console.log('email', email);
	console.log('password', password);

	const user = await fetch(`${server}/login`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(async (res) => {
		if (!res.ok) throw await res.json();
		return await res.json();
	}).catch((err) => {
		console.log('ERROR', err);
		error = err;
		return null;
	});

	if (user) {
		return {
			status: 200,
			headers: {
				'set-cookie': [
					serialize('token', user['token'], {
						path: '/',
						maxAge: 2147483647,
						secure: process.env.ENV === 'prod',
						httpOnly: true,
						sameSite: 'Strict'
					})
				]
			},
			body: user
		};
	} else {
		return {
			status: 400,
			body: {
				detail: `${error ? error.detail : `Invalid email or password, please try again.`}`
			}
			
		};
	}
}
