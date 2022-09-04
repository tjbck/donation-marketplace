<script>
	import toast, { Toaster } from 'svelte-french-toast';
	import { io } from 'socket.io-client';

	import '../tailwind.css';
	import '../app.css';

	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	import { session } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { playNotificationSound } from '$lib/utils';
	import { socket } from '$lib/socket';
	import { RECAPTCHA_CLIENT_KEY } from '$lib/env';

	onMount(() => {
		if ($session.user) {
			console.log(socket);

			socket.emit('join-room', {
				room: $session.user.id
			});

			socket.on('connect', () => {
				console.log(socket.connected); // true

				console.log('hello');
			});

			socket.on('notification', (data) => {
				console.log(data);
				playNotificationSound();
				toast(`${data.content} \n- ${data.user.name}`, {
					icon: '📬',
					position: 'top-right'
				});
			});
		}
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={RECAPTCHA_CLIENT_KEY}"></script>

	<title>Marketplace - Local Donation, the Modern Way</title>
</svelte:head>

<div>
	<div class="flex flex-row justify-center fixed top-0 z-50 w-full bg-white">
		<div class="basis-10/12 md:basis-9/12 max-w-7xl">
			<Navbar />
		</div>
	</div>
	<slot />
</div>

<Footer />

<Toaster />
