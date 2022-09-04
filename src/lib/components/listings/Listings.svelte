<script lang="ts">
	import { getListingItemById, getListings } from '$lib/apis/listings';

	import type { ItemType } from '$lib/types';
	import toast from 'svelte-french-toast';
	import TitledList from './Listings/TitledList.svelte';

	export let title = 'New Listings';
	export let query = '';
	export let items: ItemType[] = [];

	const limit = items.length;

	let reachedEnd = false;

	const showMoreHandler = async () => {
		const res = await getListings({
			query: query,
			cursor: items.length / limit,
			limit: limit
		});

		if (res.length < limit) {
			reachedEnd = true;
			toast.success("That's all the listings for now!", {
				duration: 5000,
				position: 'bottom-center'
			});
		}

		items = [...items, ...res];
	};
</script>

<div class="flex flex-row justify-center h-fit">
	<div class="basis-11/12 md:basis-10/12 max-w-5xl">
		<div class="py-6 md:py-16 ">
			<TitledList {title} {items}>
				<div slot="subtitle">
					<slot name="subtitle" />
				</div>
			</TitledList>

			{#if !reachedEnd && items.length !== 0}
				<div
					class="my-3 rounded py-2 bg-gray-100 hover:bg-gray-200 font-medium text-center text-sm text-gray-800 transition cursor-pointer"
					on:click={showMoreHandler}
				>
					Show More
				</div>
			{/if}
		</div>
	</div>
</div>
