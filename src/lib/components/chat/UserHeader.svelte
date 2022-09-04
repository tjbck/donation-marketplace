<script>
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	export let user;
</script>

<div class="flex">
	<div class="basis-1/2 flex ">
		<div class=" self-center w-10 h-10 bg-gray-100 rounded-full mr-3">
			<img
				class="w-10 h-10 rounded-full"
				src="https://avatars.dicebear.com/api/initials/{user.name}.svg"
				alt="{user.name}'s profile image"
			/>
		</div>
		<div
			class="flex flex-col font-semibold justify-between cursor-pointer"
			on:click={() => {
				location.href = `/users/${user.id}`;
			}}
		>
			<div>
				{user.name}
			</div>
			<div class=" self-end font-medium text-xs text-gray-600">
				{user.address}
			</div>
		</div>
	</div>

	<div class="basis-1/2 flex justify-end">
		<div class="flex flex-col justify-between">
			<div class="text-xs text-gray-600 font-base text-right">
				<slot name="subtitle">
					Joined {dayjs(user.createdAt * 1000).fromNow()}
				</slot>
			</div>
		</div>
	</div>
</div>
