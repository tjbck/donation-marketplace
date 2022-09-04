<script lang="ts">
	export let value: number | null;

	let hoverRate: number | null = null;
</script>

<div class="flex space-x-1">
	{#each [...Array(5)] as rating, ratingIdx}
		<div
			class="h-7 w-7 {(value !== null && value >= ratingIdx) ||
			(hoverRate !== null && hoverRate >= ratingIdx)
				? 'stroke-red-400 fill-red-400'
				: 'stroke-current fill-transparent'} cursor-pointer"
			on:mouseleave={() => {
				hoverRate = null;
			}}
			on:mouseenter={() => {
				hoverRate = ratingIdx;
			}}
			on:click={() => {
				value = hoverRate;
			}}
		>
			<svg
				viewBox="0 0 32 32"
				xmlns="http://www.w3.org/2000/svg"
				aria-label={ratingIdx + 1}
				role="img"
				focusable="false"
				style="height: 100%; width:100%; stroke-width: 2.66667; overflow: visible;"
			>
				<path
					d="m16 24-8.21105881 4.3168091c-.00488845.00257-.01093472.0006905-.01350473-.0041979-.00102339-.0019466-.00137653-.0041763-.00100477-.0063439l1.5681727-9.1431483-6.64288612-6.4752137c-.00395484-.003855-.00403576-.0101861-.00018075-.0141409.00153509-.0015749.00354651-.0025997.00572288-.002916l9.1802428-1.3339674 4.1055294-8.31871114c.0024443-.00495254.0084405-.00698593.0133931-.00454171.0019721.00097331.0035684.00256958.0045417.00454171l4.1055294 8.31871114 9.1802428 1.3339674c.0054654.0007942.0092523.0058686.0084581.0113341-.0003163.0021763-.0013411.0041878-.002916.0057228l-6.6428861 6.4752137 1.5681727 9.1431483c.0009336.0054434-.0027223.0106129-.0081656.0115465-.0021676.0003718-.0043973.0000187-.0063439-.0010047z"
				/>
			</svg>
		</div>
	{/each}
</div>
