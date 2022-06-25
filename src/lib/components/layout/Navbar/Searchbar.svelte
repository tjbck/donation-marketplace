<script>
	import { goto } from '$app/navigation';

	let query = '';

	const searchHandler = (query) => {
		goto(`/listings?query=${query}`);
	};
</script>

<form class=" w-full" on:submit|preventDefault={() => searchHandler(query)}>
	<input
		type="text"
		id="search-marketplace"
		bind:value={query}
		class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200   w-full block p-2 pl-3"
		placeholder="Search Marketplace"
		autocomplete="off"
	/>
</form>
