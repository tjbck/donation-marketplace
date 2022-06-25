import { writable } from 'svelte/store';
import { browser, dev } from '$app/env';

export const theme = browser ? writable(localStorage.theme ?? 'dark') : 'light';

export const user = writable(null);

export const API_URL = browser
	? writable(
			dev
				? `${window.location.protocol}//${window.location.hostname}:3333`
				: `https//api.erudiolabs.com`
	  )
	: `https//api.erudiolabs.com`;
