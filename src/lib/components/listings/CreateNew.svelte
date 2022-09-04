<script>
	import { session } from '$app/stores';
	import { server } from '$lib/constants';
	import { GetRecaptchaToken } from '$lib/utils';

	import { goto } from '$app/navigation';
	import { onMount, tick } from 'svelte';

	import Modal from '../common/Modal.svelte';
	import Overlay from '../common/Overlay.svelte';
	import UploadImage from '../common/UploadImage.svelte';

	export let show = true;

	let title = '';
	let content = '';
	let files = [];

	let loading = false;

	const submitForm = async (e) => {
		e.preventDefault();
		loading = true;

		const recaptcha_token = await GetRecaptchaToken();

		let payload = new FormData();

		payload.append('recaptcha_token', recaptcha_token);
		payload.append('title', title);
		payload.append('content', content);
		payload.append('file', files[0]);

		fetch(`${server}/listings/add`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${$session.user.token}`
			},
			credentials: 'include',
			body: payload
		})
			.then(async (res) => {
				if (!res.ok) throw await res.json();
				return res.json();
			})
			.then((json) => {
				loading = false;

				title = '';
				content = '';
				files = [];

				show = false;

				location.reload();
			})
			.catch((error) => {
				alert(error.detail);
				loading = false;
				content = '';
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
	<div slot="title" class="font-semibold">Item For Sale</div>

	<Overlay show={loading}>
		<div>
			<form on:submit={submitForm}>
				<div class="my-2.5 mt-4">
					<label for="title" class="block mb-2 text-sm font-medium text-gray-900 ">Images</label>
					<UploadImage bind:files />
				</div>

				<div class="my-2.5 mt-4">
					<label for="title" class="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
					<input
						type="text"
						id="title"
						bind:value={title}
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
						placeholder="Title *"
						required
					/>
				</div>
				<div class="my-2.5 mb-4">
					<label for="content" class="block mb-2 text-sm font-medium text-gray-900 "
						>Description</label
					>
					<textarea
						type="text"
						id="content"
						bind:value={content}
						rows="6"
						class="bg-gray-50 font-matter border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
						placeholder="Item description *"
						required
					/>
				</div>

				<div class="flex  justify-end">
					<div>
						<button
							type="submit"
							class="mt-2 text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-2 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800"
							>Submit</button
						>
					</div>
				</div>
			</form>
		</div>
	</Overlay>
</Modal>
