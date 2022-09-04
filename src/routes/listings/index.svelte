<script context="module">
	import { server } from '$lib/constants';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch }) {
		// extract the `[uuid]` param from the URL
		const query = url.searchParams.get('query');
		console.log(query);

		const items = await getListings({ query, limit: 8 });

		return {
			// use it as a prop of the route's component
			props: { query, items }
		};
	}
</script>

<script>
	import { getListings } from '$lib/apis/listings';

	import Listings from '$lib/components/listings/Listings.svelte';
	import ListingsMap from '$lib/components/listings/ListingsMap.svelte';
	import toast from 'svelte-french-toast';
	import { session } from '$app/stores';
	import { onMount } from 'svelte';

	export let query;
	export let items;

	const getUserLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				console.log(position);

				coordsValue = [position.coords.latitude.toString(), position.coords.longitude.toString()];
			});
		} else {
			toast.error('We could not determine your location, Please try again with your phone!');
			return null;
		}
	};
</script>

<div class="pt-12 " />

<div class="min-h-screen">
	{#key `${query}`}
		<div class="mt-2">
			{#key `${items.length}`}
				<ListingsMap
					setViewLocation={$session.user ? $session.user.coords : null}
					points={items.map((item) => ({
						coords: [
							parseFloat(item.coords[0]) + Math.random() / 500,
							parseFloat(item.coords[1]) + Math.random() / 500
						],
						content: `<a href="/listings/${item.id}">${item.title} - ${item.address}</a>`
					}))}
				/>
			{/key}
		</div>
		<Listings
			title={query ? `Search results for "${query}"` : "Today's picks"}
			bind:items
			{query}
		/>
	{/key}
</div>
