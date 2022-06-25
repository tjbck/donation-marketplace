import { dev, browser } from '$app/env';

export const server = dev
	? browser
		? `${window.location.protocol}//${window.location.hostname}:3030`
		: 'http://localhost:3030'
	: 'https://marketplace.jryng.com';
