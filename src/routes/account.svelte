<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch, session }) {
		console.log('workspace', session);

		if (session.user) {
			const res = await fetch(`${server}/users/me`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${session.user.token}`
				}
			})
				.then(async (res) => {
					if (!res.ok) throw await res.json();
					return res.json();
				})
				.then((json) => {
					return json;
				})
				.catch((err) => {
					console.log('ERROR', err);
					return null;
				});

			console.log(res);
			return {
				// use it as a prop of the route's component
				props: { userInfoData: res }
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
	import Spinner from '$lib/components/common/Spinner.svelte';

	import { server } from '$lib/constants';
	import { onMount } from 'svelte';
	import { session } from '$app/stores';

	import Overlay from '$lib/components/common/Overlay.svelte';
	import toast from 'svelte-french-toast';

	export let userInfoData;

	let locationButtonLoading = false;

	let nameValue = userInfoData.name;
	let mobileValue = userInfoData.mobile;
	let addressValue = userInfoData.address;
	let coordsValue = [];

	const updateUserInfo = async (_userInfo) => {
		console.log('updateUserInfo', _userInfo);
		if ($session.user) {
			const res = await fetch(`${server}/users/update`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					authorization: `Bearer ${$session.user.token}`
				},
				body: JSON.stringify(_userInfo)
			})
				.then(async (res) => {
					if (!res.ok) throw await res.json();
					return res.json();
				})
				.then((json) => {
					console.log(json);
					alert('Changes saved!');
					location.reload();
				})
				.catch((err) => {
					console.log('ERROR', err);
				});

			console.log(res);
		}
	};

	const updateUserLocation = () => {
		locationButtonLoading = true;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				console.log(position);

				coordsValue = [position.coords.latitude.toString(), position.coords.longitude.toString()];
				const res = await fetch(
					`${server}/utils/geolocation?` +
						new URLSearchParams({
							lat: coordsValue[0],
							lon: coordsValue[1]
						}),
					{
						method: 'GET'
					}
				).then((res) => res.json());

				console.log(res);

				addressValue = `${res.address.neighbourhood || res.address.suburb || res.address.city}, ${
					res.address.city || res.address.county
				}`;

				updateUserInfo({ address: addressValue, coords: coordsValue });
				locationButtonLoading = false;
			});
		} else {
			toast.error('We could not determine your location, Please try again with your phone!');
			return null;
		}
	};
</script>

<svelte:head>
	<title>My Account - Marketplace</title>
</svelte:head>

<div class="pt-20" />

<div class="flex flex-row justify-center min-h-screen ">
	<!-- <div class="hidden md:flex md:basis-1/12 ">01</div> -->

	<div
		class="basis-11/12 md:basis-8/12 lg:basis-6/12 max-w-7xl text-center text-gray-700 pt-8 pb-24"
	>
		{#if $session.user && userInfoData}
			<div class="mb-24">
				<div class="text-left text-3xl font-bold mb-12">User Info</div>

				<div class="flex flex-col md:flex-row w-full my-9 text-left">
					<div class="basis-3/12">
						<div class="text-left text-xl font-bold text-gray-500 py-2 md:py-0">Location</div>
					</div>

					<div class="basis-9/12">
						<div class="mb-3">
							<form
								on:submit={(e) => {
									e.preventDefault();
									updateUserLocation();
								}}
							>
								<label for="address" class="block mb-2 text-sm font-medium text-gray-900 "
									>Address</label
								>

								<div class="flex flex-col md:flex-row">
									<div class="basis-full my-1 md:basis-9/12 md:pr-1">
										<input
											type="text"
											id="address1"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 read-only:bg-gray-200 block w-full p-2.5 "
											placeholder="Your address *"
											bind:value={addressValue}
											autocomplete="off"
											readonly
											required
										/>
									</div>
									<div class="basis-full my-1 md:basis-3/12 md:pl-1 md:self-end">
										<Overlay show={locationButtonLoading} size="sm">
											<button
												type="submit"
												class=" w-full justify-center px-3 py-2.5 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
											>
												Update
											</button>
										</Overlay>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<div class="mb-24">
				<div class="text-left text-3xl font-bold mt-8 mb-12 ">Additional Info</div>

				<div class="flex flex-col md:flex-row w-full my-9 text-left">
					<div class="basis-3/12">
						<div class="text-left text-xl font-bold text-gray-500  py-2 md:py-0">Login Info</div>
					</div>

					<div class="basis-9/12">
						<div class="mb-3">
							<label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>

							<div class="flex flex-col md:flex-row">
								<div class="basis-full my-1 md:basis-9/12 md:pr-1">
									<input
										type="email"
										id="email"
										value={$session.user.email}
										class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5 "
										placeholder="Your email address *"
										disabled
										autocomplete="email"
									/>
								</div>
								<div class="basis-full my-1 md:basis-3/12 md:pl-1 md:self-end" />
							</div>
						</div>
						<div class="mb-3">
							<form
								on:submit={(e) => {
									e.preventDefault();
									updateUserInfo({ name: nameValue });
								}}
							>
								<label for="name" class="block mb-2 text-sm font-medium text-gray-900 "
									>Full Name</label
								>

								<div class="flex flex-col md:flex-row">
									<div class="basis-full my-1 md:basis-9/12 md:pr-1">
										<input
											type="text"
											id="name"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
											placeholder="Your full name *"
											bind:value={nameValue}
											required
										/>
									</div>
									<div class="basis-full my-1 md:basis-3/12 md:pl-1 md:self-end">
										<button
											type="submit"
											class=" w-full justify-center px-3 py-2.5 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
											disabled={nameValue === $session.user.name}
										>
											Save
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div class="flex flex-col md:flex-row w-full my-9 text-left">
					<div class="basis-3/12">
						<div class="text-left text-xl font-bold text-gray-500  py-2 md:py-0">Contact Info</div>
					</div>

					<div class="basis-9/12">
						<div class="mb-3">
							<form
								on:submit={(e) => {
									e.preventDefault();

									mobileValue = mobileValue.replace(/\D/g, '');
									updateUserInfo({ mobile: mobileValue });
								}}
							>
								<label for="number" class="block mb-2 text-sm font-medium text-gray-900 "
									>Mobile</label
								>

								<div class="flex flex-col md:flex-row">
									<div class="basis-full my-1 md:basis-9/12 md:pr-1">
										<input
											type="tel"
											id="number"
											bind:value={mobileValue}
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
											placeholder="Your mobile *"
											required
											maxlength="11"
											autocomplete="mobile"
										/>
									</div>
									<div class="basis-full my-1 md:basis-3/12 md:pl-1 md:self-end">
										<button
											type="submit"
											class=" w-full justify-center px-3 py-2.5 text-sm text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
											disabled={mobileValue === userInfoData.mobile}
										>
											Save
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		{:else}
			<Spinner />
		{/if}
	</div>
</div>
