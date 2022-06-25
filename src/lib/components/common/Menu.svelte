<script>
	import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@rgossiaux/svelte-headlessui';

	export let title = 'Options';
	export let options = [
		[
			{
				title: '계정 설정',
				callback: () => {
					console.log('callback');
				}
			},
			{
				title: '로그아웃',
				callback: () => {
					console.log('callback');
				}
			}
		],
		[
			{
				title: '계정 설정',
				callback: () => {
					console.log('callback');
				}
			},
			{
				title: '로그아웃',
				callback: () => {
					console.log('callback');
				}
			}
		]
	];
</script>

<Menu as="div" class="relative z-50 inline-block text-left ">
	<div>
		<MenuButton
			class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
		>
			<div class="flex  text-xs md:text-sm">
				<div>
					{title}
				</div>

				<div class="my-auto">
					<i class="bi bi-chevron-down ml-2 -mr-1 text-gray-700 hover:text-gray-800 text-xs" />
				</div>
			</div>
		</MenuButton>
	</div>
	<Transition
		enter="transition ease-out duration-100"
		enterFrom="transform opacity-0 scale-95"
		enterTo="transform opacity-100 scale-100"
		leave="transition ease-in duration-75"
		leaveFrom="transform opacity-100 scale-100"
		leaveTo="transform opacity-0 scale-95"
	>
		<MenuItems
			class="absolute  right-0 w-40 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
		>
			{#each options as items}
				<div class="px-1.5 py-1.5">
					{#each items as item}
						<MenuItem let:active>
							<button
								class={`${
									active ? 'bg-gray-100' : 'text-gray-900'
								} group flex rounded-md items-center w-full px-3 py-2.5 text-sm`}
								on:click={item.callback}
							>
								{item.title}
							</button>
						</MenuItem>
					{/each}
				</div>
			{/each}
		</MenuItems>
	</Transition>
</Menu>

<!-- <div class="px-1.5 py-1.5">
    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-gray-100' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
        >
            계정 설정
        </button>
    </MenuItem>

    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-gray-100' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-3 py-3 text-sm`}
        >
            로그아웃
        </button>
    </MenuItem>
</div>
     -->

<!-- 
<div class="px-1 py-1 ">
    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                aria-hidden="true"
            >
                <path
                    d="M4 13V16H7L16 7L13 4L4 13Z"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
            </svg>
            Edit
        </button>
    </MenuItem>

    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                aria-hidden="true"
            >
                <path
                    d="M4 4H12V12H4V4Z"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
                <path
                    d="M8 8H16V16H8V8Z"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
            </svg>
            Duplicate
        </button>
    </MenuItem>
</div>

<div class="px-1 py-1">
    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                aria-hidden="true"
            >
                <rect
                    x="5"
                    y="8"
                    width="10"
                    height="8"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
                <rect
                    x="4"
                    y="4"
                    width="12"
                    height="4"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
                <path d="M8 12H12" stroke="#A78BFA" stroke-width="2" />
            </svg>
            Archive
        </button>
    </MenuItem>
    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 mr-2"
                aria-hidden="true"
            >
                <path d="M10 4H16V10" stroke={active ? '#C4B5FD' : '#A78BFA'} stroke-width="2" />
                <path d="M16 4L8 12" stroke={active ? '#C4B5FD' : '#A78BFA'} stroke-width="2" />
                <path d="M8 6H4V16H14V12" stroke={active ? '#C4B5FD' : '#A78BFA'} stroke-width="2" />
            </svg>
            Move
        </button>
    </MenuItem>
</div>

<div class="px-1 py-1">
    <MenuItem let:active>
        <button
            class={`${
                active ? 'bg-violet-500 text-white' : 'text-gray-900'
            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
        >
            <svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                class="w-5 h-5 mr-2 text-violet-400"
            >
                <rect
                    x="5"
                    y="6"
                    width="10"
                    height="10"
                    fill={active ? '#8B5CF6' : '#EDE9FE'}
                    stroke={active ? '#C4B5FD' : '#A78BFA'}
                    stroke-width="2"
                />
                <path d="M3 6H17" stroke={active ? '#C4B5FD' : '#A78BFA'} stroke-width="2" />
                <path d="M8 6V4H12V6" stroke={active ? '#C4B5FD' : '#A78BFA'} stroke-width="2" />
            </svg>
            Delete
        </button>
    </MenuItem>
</div> -->
