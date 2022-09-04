<script context="module">
	import { getChats } from '$lib/apis/chats';

	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch, params, session }) {
		// extract the `[uuid]` param from the URL
		const chatData = await getChats(session.user.token);

		console.log(chatData);

		return {
			// use it as a prop of the route's component
			props: {
				data: {
					chats: chatData.chats,
					users: chatData.users
				}
			}
		};
	}
</script>

<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import { session } from '$app/stores';

	import UserHeader from '$lib/components/chat/UserHeader.svelte';

	export let data;
	const { chats, users } = data;
</script>

<div class="py-16 md:py-28 min-h-screen">
	<div class="flex justify-center">
		<div class="basis-11/12 max-w-lg">
			<div class=" font-semibold text-2xl md:text-3xl text-gray-700 mb-3">Messages</div>
			<hr class="my-1" />
			<div>
				{#if chats.length > 0}
					{#each chats as chat, chatIdx}
						<div
							class="py-3 px-3 rounded-lg cursor-pointer hover:bg-gray-200"
							on:click={() => {
								location.href = `/chats/${chat.user_ids.filter((id) => id != $session.user.id)[0]}`;
							}}
						>
							<UserHeader
								href={'chats'}
								user={users.filter(
									(user) => user.id === chat.user_ids.filter((id) => id != $session.user.id)[0]
								)[0]}
							>
								<div slot="subtitle">
									Last message {dayjs(chat.updatedAt * 1000).fromNow()}
								</div>
							</UserHeader>
						</div>

						<hr class="my-1" />
					{/each}
				{:else}
					<div class="w-full  py-14">
						<div class="text-center">
							<div class="text-xl font-medium">We could not find any messages... 🦗</div>
							<div class="mt-1 text-xs text-gray-400 font-medium">
								List the things you don't need, save the planet!
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>
