<script>
	import { server } from '$lib/constants';
	import { haversineDistance } from '$lib/utils';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	export let item;
	export let user;
</script>

<div class="py-3 px-4 m-3 rounded-lg bg-gray-100">
	<div
		class="flex cursor-pointer"
		on:click={() => {
			location.href = `/listings/${item.id}`;
		}}
	>
		<div class="mr-5 self-center">
			<img
				class="rounded-lg aspect-square w-12 md:w-20"
				src={item.images[0].startsWith('/static') ? `${server}${item.images[0]}` : item.images[0]}
				alt={item.title}
			/>
		</div>

		<div class="self-center">
			<div class=" text-base md:text-lg font-semibold text-gray-800">
				{item.title}
			</div>
			<div class="text-xs text-gray-500">
				{item.address}
				{#if user}
					({Math.round(haversineDistance(item.coords, user.coords), 2)} km away)
				{/if}
				∙ {dayjs(item.createdAt * 1000).fromNow()}
			</div>
		</div>
	</div>
</div>
