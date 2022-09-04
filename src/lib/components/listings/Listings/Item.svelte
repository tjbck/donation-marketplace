<script lang="ts">
	import type { ItemType } from '$lib/types';
	import { server } from '$lib/constants';

	export let item: ItemType;
</script>

<div
	class="py-4 px-2 cursor-pointer"
	title={item.title}
	on:click={() => {
		console.log(item);
		location.href = `/listings/${item.id}`;
	}}
>
	<div class="relative -z-50">
		{#if !item.availability}
			<div class="absolute w-full h-full">
				<div class="flex w-full h-full">
					<div class="m-auto text-gray-500 font-medium text-lg">Unavailable</div>
				</div>
			</div>
		{/if}
		<img
			class="rounded-lg object-cover aspect-square {item.availability ? '' : 'opacity-30'}"
			src={item.images[0].startsWith('/static') ? `${server}${item.images[0]}` : item.images[0]}
			alt={item.title}
		/>
	</div>
	<div class="pt-2 pb-1 min-w-full w-0">
		<div>
			<p class="text-md  truncate w-full">
				{item.title}
			</p>
		</div>

		<div class="text-xs text-gray-600">
			{item.address}
		</div>
	</div>
</div>
