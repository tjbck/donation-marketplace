import { server } from '$lib/constants';

export const getChats = async (token: string) => {
	const res = await fetch(`${server}/chats`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});

	return res;
};

export const getChatByUserId = async (userId: string, token: string) => {
	const res = await fetch(`${server}/chats/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return res.json();
		})
		.then((json) => {
			return json;
		})
		.catch((error) => {
			console.log(error);
			return null;
		});

	return res;
};
