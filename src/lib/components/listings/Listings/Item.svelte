<script lang="ts">
	import { server } from '$lib/variables';

	interface item {
		title: string;
		images: string[];
		address: string;
	}

	export let item: item;
</script>

<div class="py-4 px-2" title={item.title}>
	<div>
		<img
			class="rounded-lg object-cover aspect-square"
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
