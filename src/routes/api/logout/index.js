import { parse, serialize } from 'cookie';

export async function get({ params }) {
	console.log('logout', params);
	return {
		status: 302,
		headers: {
			'set-cookie': serialize('token', '', {
				path: '/',
				httpOnly: true,
				maxAge: 0
			})
		},
		body: {
			status: true
		}
	};
}
