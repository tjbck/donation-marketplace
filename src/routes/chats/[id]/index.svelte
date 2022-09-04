<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch, params, session }) {
		// extract the `[uuid]` param from the URL

		if (params.id !== session.user.id) {
			const itemId = url.searchParams.get('itemId');

			const user = await getUserById(params.id);
			const chat = await getChatByUserId(params.id, session.user.token);

			return {
				// use it as a prop of the route's component
				props: {
					data: {
						user: user,
						chat: chat,
						itemId: itemId
					}
				}
			};
		} else {
			return {
				status: 302,
				redirect: '/?error=User session could not be found, Please sign in and try again.'
			};
		}
	}
</script>

<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import { session } from '$app/stores';
	import { onMount, onDestroy } from 'svelte';
	import { socket } from '$lib/socket';

	import { getUserById } from '$lib/apis/users';
	import { getListingItemById } from '$lib/apis/listings';
	import { getChatByUserId } from '$lib/apis/chats';

	import ItemMessage from '$lib/components/chat/ItemMessage.svelte';
	import Message from '$lib/components/chat/Message.svelte';
	import UserHeader from '$lib/components/chat/UserHeader.svelte';
	import MoveBack from '$lib/components/common/MoveBack.svelte';

	export let data;
	const { user, chat, itemId } = data;

	let items = [];
	let messageValue = '';
	let messageLogs = [...chat.messages];

	const messageSubmitHandler = () => {
		messageLogs = [
			...messageLogs,
			{
				content: messageValue,
				user: {
					name: $session.user.name,
					id: $session.user.id
				}
			}
		];

		socket.emit('message', {
			room: user.id,
			content: messageValue,
			user: {
				name: $session.user.name,
				id: $session.user.id
			}
		});

		messageValue = '';
	};

	const addToItemList = async (_itemId) => {
		console.log('addToItemList', _itemId);
		const res = await getListingItemById({
			itemId: _itemId
		});

		items = [
			...items,
			{
				...res.item,
				user: res.user
			}
		];
	};

	onMount(async () => {
		if (itemId) {
			console.log(itemId);
			const itemLink = `/listings/${itemId}`;
			addToItemList(itemId);
			if (messageLogs.filter((message) => message.content.includes(itemLink)).length == 0) {
				const message = {
					room: user.id,
					content: itemLink,
					user: {
						name: $session.user.name,
						id: $session.user.id
					}
				};

				messageLogs = [...messageLogs, message];

				socket.emit('message', message);
			}
		}

		for await (let message of messageLogs) {
			if (message.content.startsWith('/listings')) {
				addToItemList(message.content.substring('/listings'.length + 1));
			}
		}

		socket.on('message', async (data) => {
			if (data.content.startsWith('/listings')) {
				addToItemList(data.content.substring('/listings'.length + 1));
			}

			console.log(data);

			messageLogs = [
				...messageLogs,
				{
					content: data.content,
					user: {
						id: data.user.id,
						name: data.user.name
					}
				}
			];
		});
	});
</script>

<div class="py-16 md:py-28 min-h-screen">
	<div class="flex justify-center">
		<div class="basis-11/12 max-w-lg">
			<MoveBack />
			<UserHeader {user} />

			<hr class="my-3" />

			<div class="h-[32rem] overflow-x-hidden overflow-scroll flex flex-col-reverse">
				{#each [...messageLogs].reverse() as message, messageIdx}
					{#if message.content.startsWith('/listings')}
						{#if items.filter((item) => item.id == message.content.substring('/listings'.length + 1)).length}
							<ItemMessage
								item={items.filter(
									(item) => item.id == message.content.substring('/listings'.length + 1)
								)[0]}
								user={$session.user}
							/>
						{/if}
					{:else}
						<Message
							user={$session.user}
							{message}
							profileImage={messageIdx == messageLogs.length - 1 ||
								(messageIdx < messageLogs.length - 1 &&
									([...messageLogs].reverse()[messageIdx + 1].content.startsWith('/listings') ||
										[...messageLogs].reverse()[messageIdx + 1].user.id != message.user.id))}
						/>
					{/if}
				{/each}
			</div>

			<div class="mt-5">
				<form on:submit|preventDefault={messageSubmitHandler}>
					<div class="flex justify-center space-x-1">
						<div class="basis-10/12">
							<textarea
								class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
								placeholder="Write your message here..."
								rows="2"
								required
								bind:value={messageValue}
							/>
						</div>
						<div class="basis-2/12">
							<button
								class="rounded-lg py-2 px-2 md:px-5 h-full w-full text-white font-semibold bg-gray-700 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
								type="submit"
							>
								Send
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
