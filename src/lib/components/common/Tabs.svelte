<script>
	import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui';
	import Dummy from './Dummy.svelte';

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	export let tabs = ['강의실', '채점 결과 내역', '학생 관리'];
</script>

<div class="w-full px-2 sm:px-0">
	<TabGroup>
		<TabList class="flex px-1 space-x-1 border-b-2">
			{#each tabs as tab}
				<Tab
					class={({ selected }) =>
						classNames(
							'mx-1 text-base leading-5 font-medium',
							'focus:outline-none  transition ease-in-out',
							selected ? ' border-b-2 border-black text-black font-semibold' : 'text-gray-500'
						)}
				>
					<div class="px-5 py-2.5 mb-0.5 rounded-lg hover:bg-gray-100  transition ease-in-out">
						{tab}
					</div>
				</Tab>
			{/each}
		</TabList>

		<TabPanels class="mt-2">
			<div class="bg-white rounded-xl px-3 py-1.5 focus:outline-none z-0">
				<slot />
			</div>
		</TabPanels>
	</TabGroup>
</div>
