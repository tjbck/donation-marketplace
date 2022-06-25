<script>
	import image from '$lib/assets/images/two-people-smartphone.png';

	import { user } from '$lib/stores/index.js';
	let userValue;
	user.subscribe((value) => {
		userValue = value;
	});
</script>

<div class="flex flex-row justify-center bg-yellow-100 h-fit">
	<div class="basis-11/12 md:basis-10/12 max-w-6xl">
		<div class="py-6 pt-10 md:py-20 md:pt-32">
			<div class="flex flex-col md:flex-row">
				<div class="basis-1/2 flex text-center md:text-left py-10">
					<div class="mx-auto lg:pl-28">
						<div>
							<div class="text-gray-500 text-sm md:text-base font-medium mb-3">
								List the things you don't need, save the planet.
							</div>

							<div class="text-4xl md:text-5xl font-bold text-gray-900">
								Local Peer-to-Peer Donation Marketplace
							</div>

							<div class="text-sm md:text-base my-5 font-medium text-gray-600">
								Find everything ranging from Local Donations to Free Events
								<br />
								Be a part of your local community, in stylish modern way.
							</div>
						</div>
					</div>
				</div>

				<div class="basis-1/2 flex ">
					<div class="m-auto lg:pr-18">
						<img class="w-52" alt="two people looking at smartphone" src={image} />
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
