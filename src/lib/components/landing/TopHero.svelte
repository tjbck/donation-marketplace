<script>
	import { goto } from '$app/navigation';
	import { session } from '$app/stores';
	import image from '$lib/assets/images/two-people-smartphone.png';
</script>

<div class="flex flex-row justify-center bg-yellow-200 h-fit">
	<div class="basis-11/12 md:basis-10/12 max-w-6xl">
		<div class="pb-8 pt-16 md:pb-14 md:pt-28">
			<div class="flex flex-col md:flex-row">
				<div class="basis-8/12 flex text-center md:text-left py-10">
					<div class="mx-auto md:pl-14">
						<div>
							<div class="text-gray-400 text-xs md:text-sm font-semibold mb-3">
								List the things you don't need, save the planet.
							</div>

							<div class="text-4xl md:text-5xl font-bold text-gray-900">
								Local Peer-to-Peer Donation <span class="linear-wipe">Marketplace</span>
							</div>

							<div class="text-sm my-5 font-medium text-gray-600">
								Find everything you need from Local Donations,<br /> Be a part of your local community
							</div>

							<div>
								<button
									class="rounded-lg py-2 px-6 text-white font-semibold bg-gray-700 hover:bg-gray-800 "
									on:click={() => {
										goto('/listings');
									}}
								>
									Show Listings
								</button>
							</div>
						</div>
					</div>
				</div>

				<div class="basis-4/12 flex ">
					<div class="m-auto md:pr-20 py-3">
						<img class=" w-48" alt="two people looking at smartphone" src={image} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
