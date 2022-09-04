import { server } from '$lib/constants';

export const getUserById = async (userId: string) => {
	const res = await fetch(`${server}/users/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
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

export const getReviewsByUserId = async (userId: string) => {
	const res = await fetch(`${server}/reviews/${userId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
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

type PostReviewForm = {
	userId: string;
	rating: number;
	content: string;
};

export const postReview = async ({ userId, rating, content }: PostReviewForm, token: string) => {
	const res = await fetch(`${server}/reviews/add`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			user_id: userId,
			rating: rating,
			content: content
		})
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
