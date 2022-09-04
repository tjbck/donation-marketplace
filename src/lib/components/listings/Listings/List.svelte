<script lang="ts">
	import type { ItemType } from '$lib/types';
	import Item from './Item.svelte';

	export let items: ItemType[] = [];
	export let maxCol: number = 4;
</script>

<div class="hidden md:basis-1/3 md:basis-1/4" />
<div class="flex flex-wrap justify-start">
	{#if items.length > 0}
		{#each items as item, idx}
			<div class="basis-1/2 md:basis-1/{maxCol} flex">
				<Item {item} />
			</div>
		{/each}
	{:else}
		<div class="w-full  py-14">
			<slot name="no-item">
				<div class="text-center">
					<div class="text-xl font-medium">We could not find any items... 🦗</div>
					<div class="mt-1 text-xs text-gray-400 font-medium">
						List the things you don't need, save the planet!
					</div>
				</div>
			</slot>
		</div>
	{/if}
</div>
