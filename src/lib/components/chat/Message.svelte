<script>
	export let user;
	export let message;

	export let profileImage = false;
</script>

<div class="flex {user.id === message.user.id ? 'justify-end' : 'justify-start'}">
	{#if user.id !== message.user.id}
		<div class="mr-2 self-center">
			{#if profileImage}
				<img
					class="w-10 h-10 rounded-full"
					src="https://avatars.dicebear.com/api/initials/{message.user.name}.svg"
					alt="{message.user.name}'s profile image"
				/>
			{:else}
				<div class="w-10 h-10" />
			{/if}
		</div>
	{/if}

	<div class="basis-8/12 flex {user.id === message.user.id ? 'justify-end' : 'justify-start'}">
		<div
			class="rounded-xl 
						{user.id === message.user.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}  px-3 py-2 my-1"
		>
			{message.content}
		</div>
	</div>
</div>
