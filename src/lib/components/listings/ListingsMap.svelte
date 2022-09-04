<script>
	import 'leaflet/dist/leaflet.css';
	import { browser } from '$app/env';
	import { onMount, onDestroy } from 'svelte';

	let map;
	let mapElement;

	export let setViewLocation = [51.505, -0.09];
	export let points = [
		{
			coords: [51.5, -0.09],
			content: '<a href="http://www.google.com">Visit Google1</a>'
		},
		{
			coords: [51.501, -0.09],
			content: '<a href="http://www.google.com">Visit Google2</a>'
		},
		{
			coords: [51.502, -0.09],
			content: '<a href="http://www.google.com">Visit Google3</a>'
		},
		{
			coords: [51.503, -0.09],
			content: '<b>Hello world!</b><br>I am a popup.'
		},
		{
			coords: [51.505, -0.09],
			content: '<a href="http://www.google.com">Visit Google5</a>'
		}
	];

	onMount(async () => {
		if (browser) {
			const leaflet = await import('leaflet');

			map = leaflet
				.map(mapElement)
				.setView(setViewLocation ? setViewLocation : [51.505, -0.09], 13);

			leaflet
				.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				})
				.addTo(map);

			let markers = [];

			for (let point of points) {
				const marker = leaflet.marker(point.coords).bindPopup(point.content);

				markers.push(marker);
			}
			let markerGroup = leaflet.featureGroup(markers).addTo(map);

			if (setViewLocation === null) {
				map.fitBounds(markerGroup.getBounds());
			}

			console.log(markers);
		}
	});

	onDestroy(async () => {
		if (map) {
			console.log('Unloading Leaflet map.');
			map.remove();
		}
	});
</script>

<main class=" z-10">
	<div bind:this={mapElement} class="h-96 z-10" />
</main>
