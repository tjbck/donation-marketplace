<script lang="ts">
	export let cameraMode = true;
	export let buttonText = 'Click here to upload an image';
	export let files;

	let inputElement: Element;
	let image;

	$: if (files) {
		// Note that `files` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		console.log(files);

		for (const file of files) {
			console.log(`${file.name}: ${file.size} bytes`);
		}

		if (files.length !== 0) {
			const reader = new FileReader();

			reader.onload = () => {
				image = reader.result;
			};

			reader.readAsDataURL(files[0]);
		}
	}
</script>

<input
	bind:this={inputElement}
	bind:files
	id="file-upload"
	class="hidden"
	accept="image/*"
	capture={cameraMode}
	type="file"
/>

<div>
	{#if image && files.length !== 0}
		<div
			on:click={() => {
				inputElement.click();
			}}
		>
			<img
				src={image}
				alt={files[0].name}
				class="rounded-md my-2 outline-dashed outline-1 outline-offset-2 mx-auto"
			/>
			<div class="text-xs mt-1">{files[0].name}</div>
		</div>
	{:else}
		<button
			class="rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer py-3 px-3 w-full text-center"
			type="button"
			on:click={() => {
				inputElement.click();
			}}
		>
			{files.length === 0 ? buttonText : files[0].name}
		</button>
	{/if}
</div>
