<script>
	import Item from '../listings/Listings/Item.svelte';

	export let title = 'New Listings';
	export let items = [];
</script>

<div class="flex flex-row justify-center h-fit">
	<div class="basis-11/12 md:basis-10/12 max-w-5xl">
		<div class="py-6 md:py-16 ">
			<div class="flex justify-between mb-6 ">
				<div class="text-xl font-medium">{title}</div>
				<slot name="subtitle" />
			</div>
			<div class="px-10">
				<div class="flex flex-wrap justify-start">
					{#if items.length > 0}
						{#each items as item, idx}
							<div class="basis-1/2 md:basis-1/3 lg:basis-1/4 flex">
								<Item {item} />
							</div>
						{/each}
					{:else}
						<div class="w-full py-8">
							<slot name="no-item">
								<div class="text-center">
									<div class="text-xl font-medium">We could not find any items... 🦗</div>
									<div class="text-sm">Please try again in a few minutes.</div>
								</div>
							</slot>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
