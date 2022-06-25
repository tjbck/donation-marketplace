<script lang="ts">
	import Modal from '../common/Modal.svelte';
	import Overlay from '../common/Overlay.svelte';

	import { goto } from '$app/navigation';
	import { user } from '$lib/stores';
	import { server } from '$lib/variables';
	import { GetRecaptchaToken } from '$lib/utils';

	export let show = true;

	let loading = false;
	let locationButtonLoading = false;

	let email: string;
	let password: string;

	let name: string;
	let mobile: string;
	let address: string;
	let coords: string[];

	const submitForm = async (e) => {
		e.preventDefault();

		const validated = validateHandler();
		const token = await GetRecaptchaToken();

		if (validated && token) {
			loading = true;

			const payload = {
				email,
				password,
				name,
				mobile,
				address,
				coords,
				recaptcha_token: token
			};

			fetch(`${server}/signup`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(payload)
			})
				.then(async (res) => {
					if (!res.ok) throw await res.json();
					return res.json();
				})
				.then((json) => {
					localStorage.setItem('token', 'Bearer ' + json['token']);

					user.update(() => ({
						email: json.email,
						name: json.name
					}));

					show = false;
				})
				.catch((error) => {
					console.log(error);

					alert(error.detail);

					loading = false;
					email = '';
					password = '';
				});
		}
	};

	const validateHandler = () => {
		if (!coords || !address) {
			alert(
				'Your location is required to sign up, Please click the button below to set your location.'
			);
			return false;
		}

		return true;
	};

	const getUserLocation = () => {
		locationButtonLoading = true;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(async (position) => {
				console.log(position);

				coords = [position.coords.latitude.toString(), position.coords.longitude.toString()];
				const res = await fetch(
					`${server}/utils/geolocation?` +
						new URLSearchParams({
							lat: coords[0],
							lon: coords[1]
						}),
					{
						method: 'GET'
					}
				).then((res) => res.json());

				console.log(res);

				address = `${res.address.neighbourhood || res.address.suburb || res.address.city}, ${
					res.address.city || res.address.county
				}`;
				locationButtonLoading = false;
			});
		} else {
			alert('We could not determine your location, Please try again with your phone!');
		}
	};
</script>

<Modal
	bind:show
	options={{
		closeOnBackdropOrEsc: true,
		footer: false
	}}
>
	<div slot="title" class="flex  w-full">
		<div class="basis-12/12 font-semibold">Sign Up for Free</div>
	</div>
	<div>
		<Overlay show={loading}>
			<form on:submit={submitForm}>
				<div class="my-2.5  mt-4">
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
						placeholder="Your email address *"
						required
					/>
				</div>
				<div class="my-2.5  mb-4">
					<label for="password" class="block mb-2 text-sm font-medium text-gray-900 "
						>Password</label
					>
					<input
						type="password"
						id="password"
						bind:value={password}
						class="bg-gray-50 font-matter border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						placeholder="Your password *"
						required
					/>
				</div>

				<hr class="my-3 " />

				<div class="my-2.5">
					<label for="name" class="block mb-2 text-sm font-medium text-gray-900 ">Name</label>
					<input
						type="text"
						id="name"
						bind:value={name}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
						placeholder="Your full name *"
						required
					/>
				</div>

				<div class="my-2.5">
					<label for="number" class="block mb-2 text-sm font-medium text-gray-900 ">Mobile</label>
					<input
						type="tel"
						id="number"
						bind:value={mobile}
						maxlength="11"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
						placeholder="Your mobile *"
						required
					/>
				</div>

				<div class="my-2.5">
					<label for="address" class="block mb-2 text-sm font-medium text-gray-900 ">Location</label
					>

					{#if address}
						<input
							type="text"
							id="address"
							bind:value={address}
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 read-only:bg-gray-200 block w-full p-2.5 "
							placeholder="Your address *"
							readonly={true}
							autocomplete="off"
							required
						/>
					{:else}
						<Overlay show={locationButtonLoading} size="sm">
							<button
								class="rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer py-3 px-3 w-full text-center"
								on:click={getUserLocation}
								type="button"
							>
								Click here to set your location *
							</button>
						</Overlay>
					{/if}
				</div>

				<div class="text-xs mt-2 text-left text-gray-500">* indicates required fields</div>

				<div class="flex justify-center">
					<div class="basis-9/12 my-auto font-medium text-sm text-gray-500" />
					<div class="basis-3/12">
						<button
							type="submit"
							class="mt-2 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
							>Sign Up</button
						>
					</div>
				</div>
			</form>
		</Overlay>
	</div>
</Modal>
