<script>
	import toast from 'svelte-french-toast';

	import { goto } from '$app/navigation';

	import { server } from '$lib/constants';
	import { GetRecaptchaToken } from '$lib/utils';
	import { onMount, tick } from 'svelte';

	import Modal from '../common/Modal.svelte';
	import Overlay from '../common/Overlay.svelte';

	export let show = true;

	let email = '';
	let password = '';
	let loading = false;

	const submitForm = async (e) => {
		e.preventDefault();
		loading = true;

		const token = await GetRecaptchaToken();

		const payload = {
			email,
			password,
			recaptcha_token: token
		};

		fetch(`/api/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'include',
			body: JSON.stringify(payload)
		})
			.then(async (res) => {
				if (!res.ok) throw await res.json();
				return res.json();
			})
			.then((json) => {
				show = false;
				window.location.href = '/listings';
			})
			.catch((error) => {
				toast.error(error.detail);
				loading = false;
				email = '';
				password = '';
			});
	};
</script>

<Modal
	bind:show
	options={{
		closeOnBackdropOrEsc: true,
		footer: false
	}}
>
	<div slot="title" class="font-semibold">Sign In</div>

	<Overlay show={loading}>
		<div>
			<form on:submit={submitForm}>
				<div class="my-2.5 mt-4">
					<label for="email" class="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
					<input
						type="email"
						id="email"
						bind:value={email}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
						placeholder="Your email address *"
						required
						autocomplete
					/>
				</div>
				<div class="my-2.5 mb-4">
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
						autocomplete
					/>
				</div>

				<div class="flex justify-center">
					<div class="basis-9/12 my-auto font-medium text-sm text-gray-500" />
					<div class="basis-3/12">
						<button
							type="submit"
							class="mt-2 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
							>Sign In</button
						>
					</div>
				</div>
			</form>
		</div>
	</Overlay>
</Modal>
