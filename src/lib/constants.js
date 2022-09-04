import { dev, browser } from '$app/env';
import { SERVER_URL } from './env';

export const server = dev
	? browser
		? `${window.location.protocol}//${window.location.hostname}:3030`
		: 'http://localhost:3030'
	: SERVER_URL;
