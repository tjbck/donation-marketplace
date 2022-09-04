import { server } from '$lib/constants';

export const getNewListings = async () => {
	const res = await fetch(`${server}/listings/new`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return await res.json();
		})
		.catch((error) => {
			console.log(error);
			return null;
		});

	console.log(res);
	return res;
};

type GetListingsForm = {
	query?: string | null;
	cursor?: number;
	limit?: number;
};

export const getListings = async ({ query, cursor, limit }: GetListingsForm) => {
	const res = await fetch(
		`${server}/listings?${new URLSearchParams({
			query: query ?? '',
			cursor: cursor?.toString() ?? '0',
			limit: limit?.toString() ?? '4'
		})}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		}
	)
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return await res.json();
		})
		.catch((err) => {
			console.log('ERROR', err);
			return null;
		});

	return res;
};

export const getListingsByUserId = async (userId: string) => {
	const res = await fetch(`${server}/listings/users/${userId}`, {
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

type ItemIdForm = {
	itemId: string;
};

export const getListingItemById = async ({ itemId }: ItemIdForm) => {
	const res = await fetch(`${server}/listings/items/${itemId}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		}
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return await res.json();
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
	return res;
};

type AvailabilityForm = {
	availability: boolean;
};

export const updateListingItemAvailabilityById = async (
	{ itemId, availability }: ItemIdForm & AvailabilityForm,
	token: string
) => {
	const res = await fetch(`${server}/listings/items/edit/availability`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			item_id: itemId,
			availability: availability
		})
	})
		.then(async (res) => {
			if (!res.ok) throw await res.json();
			return await res.json();
		})
		.catch((error) => {
			console.log(error);
			return null;
		});
	return res;
};
