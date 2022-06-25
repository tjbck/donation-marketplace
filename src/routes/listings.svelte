<script context="module">
	import { server } from '$lib/variables';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch }) {
		// extract the `[uuid]` param from the URL
		let items = [];
		const query = url.searchParams.get('query');
		console.log(query);

		const res = await fetch(`${server}/listings?${query ? new URLSearchParams({ query }) : ''}`, {
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
			.catch((err) => {
				console.log('ERROR', err);
				return null;
			});

		if (res) {
			items = res.items;
		}

		return {
			// use it as a prop of the route's component
			props: { query, items }
		};
	}
</script>

<script>
	import Listings from '$lib/components/listings/Listings.svelte';
	import { user } from '$lib/stores';

	export let query;
	export let items;
</script>

<div class="pt-8 " />

<div class="min-h-screen">
	<Listings title={query ? `Search results for "${query}"` : "Today's picks"} {items} />
</div>
