<script>
	import { goto } from '$app/navigation';

	import Menu from '../common/Menu.svelte';

	import Login from '../landing/Login.svelte';
	import Signup from '../landing/Signup.svelte';

	import Searchbar from './Navbar/Searchbar.svelte';

	let showLoginModal = false;
	let showSignupModal = false;

	let showCreateNewListingModal = false;

	import { user } from '$lib/stores';
	import CreateNew from '../listings/CreateNew.svelte';
	let userValue;
	user.subscribe((value) => {
		console.log('userValue', value);
		userValue = value;
	});

	const signOutHandler = () => {
		goto('/');
		localStorage.removeItem('token');
		user.update(() => null);
	};
</script>

<nav class="py-3" id="nav">
	<div class="flex flex-row">
		<div class="flex flex-row items-start w-8 mr-1.5">
			<div class="basis-full my-auto">
				<a href="/">
					<img src="/favicon.png" class="w-6" alt="books" />
				</a>
			</div>
		</div>
		<div class="hidden sm:flex flex-row items-center  md:items-start">
			<div class="basis-full text-center my-auto">
				<a href="/">
					<span class="text-bold text-xl font-medium text-gray-600 hover:text-gray-800"
						>Marketplace</span
					>
				</a>
			</div>
		</div>

		<div class="flex flex-row items-center ml-auto text-center">
			<div class="hidden lg:flex mx-1 w-80">
				<Searchbar />
			</div>

			{#if !$user}
				<Login bind:show={showLoginModal} />
				<Signup bind:show={showSignupModal} />
				<div class="ml-2">
					<button
						class="hover:bg-gray-100 rounded text-sm font-medium px-4 py-2"
						on:click={() => {
							showLoginModal = true;
						}}
					>
						<span>Sign in</span>
					</button>
				</div>

				<div class="ml-2">
					<button
						class=" bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white text-sm font-medium"
						on:click={() => {
							showSignupModal = true;
						}}
					>
						<span>Sign up</span>
					</button>
				</div>
			{:else}
				<CreateNew bind:show={showCreateNewListingModal} />
				<div class="ml-2">
					<button
						class=" bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white text-sm font-medium"
						on:click={() => {
							showCreateNewListingModal = true;
						}}
					>
						<div class="flex text-xs md:text-sm">
							<div class="my-auto">
								<i class="bi bi-plus-lg mr-2 -ml-1 text-white hover:text-gray-100 text-xs" />
							</div>
							<div>Create new listing</div>
						</div>
					</button>
				</div>
				<div class="ml-2">
					<Menu
						title={`${userValue.name}`}
						options={[
							[
								{
									title: 'My Account',
									callback: () => {
										console.log('account');
										goto('/account');
									}
								}
							],
							[
								{
									title: 'Sign Out',
									callback: signOutHandler
								}
							]
						]}
					/>
				</div>
			{/if}
		</div>
	</div>
</nav>
