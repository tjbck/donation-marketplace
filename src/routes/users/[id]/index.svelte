<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ url, fetch, params }) {
		// extract the `[uuid]` param from the URL
		const userId = params.id;

		const listingData = await getListingsByUserId(userId);
		const reviews = await getReviewsByUserId(userId);

		console.log(reviews);

		return {
			// use it as a prop of the route's component
			props: { data: listingData, reviews: reviews }
		};
	}
</script>

<script lang="ts">
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime.js';
	dayjs.extend(relativeTime);

	import { session } from '$app/stores';
	import List from '$lib/components/listings/Listings/List.svelte';
	import { getReviewsByUserId, postReview } from '$lib/apis/users';
	import { getListingsByUserId } from '$lib/apis/listings';
	import toast from 'svelte-french-toast';
	import Rating from '$lib/components/common/Rating.svelte';

	export let data;
	export let reviews;

	const { items, user } = data;

	let ratingValue: number | null = null;
	let reviewContentValue = '';

	const reviewSubmitHandler = async () => {
		if (ratingValue !== null) {
			const res = await postReview(
				{ userId: user.id, rating: ratingValue + 1, content: reviewContentValue },
				$session.user.token
			);
			if (res) {
				ratingValue = null;
				reviewContentValue = '';
				toast.success('Successfully added review!');
				const res = await getReviewsByUserId(user.id);
				reviews = res;
			} else {
				toast.error('Failed to add your review, please try again');
			}
		} else {
			toast.error('Please select star rating.');
		}
	};

	const ratingToTextHandler = (rating: number) => {
		switch (rating) {
			case 0:
				return 'Terrible';
			case 1:
				return 'Bad';
			case 2:
				return 'Okay';
			case 3:
				return 'Good';
			case 4:
				return 'Great';
		}
	};
</script>

<div class="py-16 md:py-28 min-h-screen">
	<div class="flex justify-center">
		<div class="basis-11/12  max-w-2xl">
			<div class="flex">
				<div class="basis-1/2 flex ">
					<div class=" self-center w-10 h-10 bg-gray-100 rounded-full mr-3">
						<img
							class="w-10 h-10 rounded-full"
							src="https://avatars.dicebear.com/api/initials/{user.name}.svg"
							alt="{user.name}'s profile image"
						/>
					</div>
					<div class="flex flex-col font-semibold justify-between">
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
							Joined {dayjs(user.createdAt * 1000).fromNow()}
						</div>
					</div>
				</div>
			</div>
			<hr class="my-5" />

			<div class="mt-5">
				<div class="text-xl font-semibold">{user.name}'s Listings</div>
				<div class="mt-3">
					<List {items} maxCol="3" />
				</div>
			</div>

			<hr class="my-5" />

			<div class="mt-5">
				<div class="text-xl font-semibold flex">
					<div>
						Reviews · {reviews.reviews.length} reviews
					</div>

					{#if reviews.reviews.length > 0}
						<div class="flex ml-1">
							(
							<div class="self-center mr-1">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									class="w-5 h-5"
								>
									<path
										fill-rule="evenodd"
										d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
							<div class="self-center">
								{Math.round(
									(reviews.reviews.reduce((a, e, i, arr) => {
										return a + e.rating;
									}, 0) /
										reviews.reviews.length) *
										100
								) / 100})
							</div>
						</div>
					{/if}
				</div>

				<div class="">
					{#if $session.user && $session.user.id !== user.id}
						<form on:submit|preventDefault={reviewSubmitHandler}>
							<div class="flex flex-col md:flex-row my-4 justify-between space-y-1">
								<div class="self-center font-medium text-lg mr-2">How was {user.name}?</div>

								<div class="self-center flex">
									{#if ratingValue !== null}
										<div class="self-center font-medium text-lg">
											{ratingToTextHandler(ratingValue)}
										</div>
										<div class="self-center mx-2 font-medium text-lg">·</div>
									{/if}
									<div class="self-center ">
										<Rating bind:value={ratingValue} />
									</div>
								</div>
							</div>

							<div class="basis-full mb-2">
								<textarea
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:text-gray-500 disabled:bg-gray-200 block w-full p-2.5  "
									placeholder="Write your review of {user.name} here..."
									rows="3"
									required
									bind:value={reviewContentValue}
								/>
							</div>

							<div class="flex justify-between">
								<div class=" self-start text-xs text-gray-500 font-medium">
									Posting as {$session.user.name}
								</div>

								<div class=" self-center">
									<button
										class="rounded-lg py-2 px-2 md:px-5 h-full w-full text-white font-semibold bg-gray-700 hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition"
										type="submit"
									>
										Post
									</button>
								</div>
							</div>
						</form>
						<hr class="my-3" />
					{/if}

					{#if reviews.reviews.length > 0}
						{#each reviews.reviews as review, reviewIdx}
							<div class="my-7">
								<div class="flex">
									<div class="self-center mr-3">
										<img
											class="w-10 h-10 rounded-full"
											src="https://avatars.dicebear.com/api/initials/{reviews.users.filter(
												(user) => user.id === review.reviewer_id
											)[0].name}.svg"
											alt="{reviews.users.filter((user) => user.id === review.reviewer_id)[0]
												.name}'s profile image"
										/>
									</div>
									<div class="self-center">
										<div class="font-medium">
											{reviews.users.filter((user) => user.id === review.reviewer_id)[0].name}
										</div>
										<div class="text-gray-400 text-sm">
											{dayjs(review.createdAt * 1000).format('MMMM YYYY')}
										</div>
									</div>
								</div>
								<div class="px-2 my-3">
									{review.content}
								</div>
							</div>
						{/each}
					{:else}
						<div class="my-3">No reviews yet.</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
