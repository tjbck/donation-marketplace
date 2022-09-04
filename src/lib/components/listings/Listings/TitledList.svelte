<script lang="ts">
	import type { ItemType } from '$lib/types';
	import List from './List.svelte';

	export let title = 'New Listings';
	export let items: ItemType[] = [];
	export let maxCol: number = 4;
</script>

<div class="flex justify-between mb-6 ">
	<div class="text-xl font-bold">{title}</div>
	<slot name="subtitle" />
</div>
<div class="px-2 md:px-5">
	<List {items} {maxCol} />
</div>
