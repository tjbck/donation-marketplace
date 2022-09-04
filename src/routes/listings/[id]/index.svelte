<script context="module">
	import { server } from '$lib/constants';
	import { stringify } from 'postcss';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch, params }) {
		// extract the `[uuid]` param from the URL
		const itemId = params.id;

		const data = await getListingItemById({ itemId: itemId });
		const items = await getListingsByUserId(data.user.id);

		return {
			// use it as a prop of the route's component
			props: { data: data, items: items.items }
		};
	}
</script>

<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import { session } from '$app/stores';
	import { haversineDistance } from '$lib/utils';

	import TitledList from '$lib/components/listings/Listings/TitledList.svelte';
	import {
		getListingItemById,
		getListingsByUserId,
		getNewListings,
		updateListingItemAvailabilityById
	} from '$lib/apis/listings';
	import toast from 'svelte-french-toast';

	export let data;
	export let items;

	const { item, user } = data;

	const updateItemAvailablityHandler = async (availability: boolean) => {
		const res = await updateListingItemAvailabilityById(
			{ itemId: item.id, availability: availability },
			$session.user.token
		);

		if (res) {
			location.reload();
		} else {
			toast.error('Something went wrong :/');
		}
	};
</script>

<div class="py-16 md:py-24 min-h-screen">
	<div class="flex justify-center">
		<div class="basis-11/12  max-w-2xl">
			<div
				class="mb-3 cursor-pointer"
				on:click={() => {
					history.back();
				}}
			>
				<div class="flex text-xs text-gray-500 font-medium">
					<div class="self-center mr-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="w-3 h-3"
						>
							<path
								fill-rule="evenodd"
								d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
					<div class="self-center">Back to listings</div>
				</div>
			</div>
			<div
				class="cursor-pointer relative -z-50"
				on:click={() => {
					window.open(
						item.images[0].startsWith('/static') ? `${server}${item.images[0]}` : item.images[0],
						'_blank'
					);
				}}
			>
				{#if !item.availability}
					<div class="absolute w-full h-full">
						<div class="flex w-full h-full">
							<div class="m-auto text-gray-500 font-medium text-lg">Item Unavailable</div>
						</div>
					</div>
				{/if}
				<img
					class="rounded-lg w-full object-cover md:h-96  {item.availability ? '' : 'opacity-30'}"
					src={item.images[0].startsWith('/static') ? `${server}${item.images[0]}` : item.images[0]}
					alt={item.title}
				/>
			</div>

			<div class="flex justify-between mt-5">
				<div
					class="basis-1/2 flex cursor-pointer "
					on:click={() => {
						location.href = `/users/${user.id}`;
					}}
				>
					<div class=" self-center w-10 h-10 bg-gray-100 rounded-full mr-3">
						<img
							class="w-10 h-10 rounded-full"
							src="https://avatars.dicebear.com/api/initials/{user.name}.svg"
							alt="{user.name}'s profile image"
						/>
					</div>
					<div class="flex flex-col font-semibold justify-between">
						<div>
							{user.name}
						</div>
						<div class=" self-end font-medium text-xs text-gray-600">
							{user.address}
						</div>
					</div>
				</div>
				<div class="basis-1/2 flex justify-end">
					<div class="self-center">
						{#if $session.user}
							{#if $session.user.id === item.user_id}
								<button
									class="rounded-lg py-2 px-6 font-semibold {item.availability
										? 'text-green-700  bg-green-100 hover:bg-green-200'
										: 'text-blue-700  bg-blue-100 hover:bg-blue-200'}  disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
									on:click={async () => {
										await updateItemAvailablityHandler(!item.availability);
									}}
								>
									<div class="flex ">
										<div class="self-center mr-2">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 20 20"
												fill="currentColor"
												class="w-4 h-4"
											>
												<path
													fill-rule="evenodd"
													d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
													clip-rule="evenodd"
												/>
											</svg>
										</div>

										<div class="self-center font-medium">
											Mark as {item.availability ? 'Sold' : 'Available'}
										</div>
									</div>
								</button>
							{:else}
								<button
									class="rounded-lg py-2 px-6 text-white font-semibold bg-gray-700 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
									disabled={!item.availability}
									on:click={() => {
										location.href = `/chats/${item.user_id}?itemId=${item.id}`;
									}}
								>
									{item.availability ? 'Message Seller' : 'Unavailable'}
								</button>
							{/if}
						{/if}
					</div>
				</div>
			</div>

			<hr class="my-5" />

			<div class="flex flex-col">
				<div class="text-xl font-semibold text-gray-800">
					{item.title}
				</div>
				<div class="text-sm text-gray-500">
					{item.address}
					{#if $session.user}
						({Math.round(haversineDistance(item.coords, $session.user.coords), 2)} km away)
					{/if}
					∙ {dayjs(item.createdAt * 1000).fromNow()}
				</div>

				<div class="my-5">
					{item.content}
				</div>
			</div>

			<div class="my-20">
				<TitledList title="{user.name}'s Other Listings" {items} maxCol={3}>
					<div class="text-sm mt-auto" slot="subtitle">
						<a href="/users/{user.id}">See more</a>
					</div>
				</TitledList>
			</div>
		</div>
	</div>
</div>
