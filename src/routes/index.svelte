<script context="module">
	import { server } from '$lib/variables';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch }) {
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
			.catch((err) => {
				console.log('ERROR', err);
				return null;
			});

		return {
			// use it as a prop of the route's component
			props: { items: res.items }
		};
	}
</script>

<script>
	import Top from '$lib/components/landing/Top.svelte';
	import Listings from '$lib/components/listings/Listings.svelte';
	export let items = [];
</script>

<Top />
<Listings title="New Listings" {items}>
	<div class="text-sm mt-auto" slot="subtitle"><a href="/listings">See more</a></div>
</Listings>
