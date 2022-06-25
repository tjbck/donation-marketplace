<script>
	import Spinner from './Spinner.svelte';

	export let show = false;
	export let size = 'md';

	export let opacity = 0.75;
</script>

{#if show}
	<div class="relative">
		<div class="absolute w-full h-full flex">
			<div
				class="absolute bg-white rounded outline outline-4 outline-white"
				style="inset: 0px; opacity: {opacity}; backdrop-filter: blur(2px);"
			/>
			<Spinner className="m-auto" {size} />
		</div>
		<slot />
	</div>
{:else}
	<slot />
{/if}
