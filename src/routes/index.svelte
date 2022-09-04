<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({}) {
		const items = await getNewListings();

		return {
			// use it as a prop of the route's component
			props: { items: items }
		};
	}
</script>

<script>
	import toast from 'svelte-french-toast';
	import { page } from '$app/stores';

	import { getNewListings } from '$lib/apis/listings';
	import TopHero from '$lib/components/landing/TopHero.svelte';
	import Listings from '$lib/components/listings/Listings.svelte';
	import { onMount } from 'svelte';

	export let items = [];

	onMount(() => {
		const error = $page.url.searchParams.get('error');
		if (error) {
			toast.error(error);
		}
	});
</script>

<TopHero />
<Listings title="New Listings" {items}>
	<div class="text-sm font-semibold mt-auto" slot="subtitle">
		<a href="/listings">See more</a>
	</div>
</Listings>
