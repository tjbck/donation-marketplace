<script lang="ts">
	import {
		Dialog,
		DialogOverlay,
		DialogTitle,
		Transition,
		TransitionChild
	} from '@rgossiaux/svelte-headlessui';

	export let show = false;
	export let width = '30rem';
	export let options = {
		closeOnBackdropOrEsc: true,
		footer: true
	};
</script>

<Transition appear {show}>
	<Dialog
		as="div"
		class="fixed inset-0 z-50 overflow-y-auto"
		on:close={() => {
			if (options.closeOnBackdropOrEsc) {
				show = false;
			}
		}}
	>
		<div class="fixed inset-0 bg-black opacity-30" />
		<div class="min-h-screen px-4 text-center">
			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<DialogOverlay class="fixed inset-0" />
			</TransitionChild>

			<TransitionChild
				enter="ease-out duration-300"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="ease-in duration-200"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
			>
				<!-- This element is to trick the browser into centering the modal contents. -->
				<!-- <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span> -->

				<div class="flex" style="height: 85vh;">
					<div class="m-auto" style="width: {width}">
						<div
							class="inline-block w-full max-w-md py-6 px-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
						>
							<DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
								<slot name="title">Payment successful</slot>
							</DialogTitle>

							<div class="mt-2 text-sm text-gray-500">
								<slot>
									<p>
										Your payment has been successfully submitted. We’ve sent you an email with all
										of the details of your order.
									</p>
								</slot>
							</div>

							{#if options.footer}
								<div class="mt-4 text-right">
									<slot name="footer">
										<button
											type="button"
											class="inline-flex justify-center px-3 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
											on:click={() => {
												show = false;
											}}
										>
											취소
										</button>

										<button
											type="button"
											class="inline-flex justify-center px-3 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
											on:click={() => {
												show = false;
											}}
										>
											확인
										</button>
									</slot>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</TransitionChild>
		</div>
	</Dialog>
</Transition>
