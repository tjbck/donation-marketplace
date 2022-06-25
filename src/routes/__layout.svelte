<script>
	import '../tailwind.css';
	import '../app.css';

	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { fade } from 'svelte/transition';

	import { page } from '$app/stores';
	import { routeGuard, setSession } from '$lib/session';
	import { onMount } from 'svelte';

	let loaded = false;

	onMount(async () => {
		console.log('onMount:layout');

		await setSession();
		if (routeGuard($page.url.pathname)) {
			loaded = true;
		}
	});

	$: $page.url.pathname,
		async () => {
			routeGuard($page.url.pathname);
		};
</script>

<svelte:head>
	<title>Marketplace - Local Donation, the Modern Way</title>
</svelte:head>

<div>
	{#if loaded}
		<div
			class="flex flex-row justify-center fixed top-0 w-full bg-white"
			transition:fade={{ duration: 500 }}
		>
			<div class="basis-10/12 md:basis-9/12 max-w-7xl">
				<Navbar />
			</div>
		</div>
	{/if}
	<slot />
</div>

<Footer />
