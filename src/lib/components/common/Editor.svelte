<script>
	import { onMount } from 'svelte';

	let editor;
	let editorElement;

	onMount(() => {
		editor = new Quill(editorElement, {
			modules: {
				toolbar: [[{ header: [1, 2, false] }], ['bold', 'italic', 'underline'], ['code-block']]
			},
			placeholder: 'Compose an epic...',
			theme: 'snow'
		});
	});

	const getContents = () => {
		const contents = editor.getContents();
		console.log(contents);
		console.log(editor.root.innerHTML);
	};
</script>

<div class="flex flex-col">
	<div bind:this={editorElement} class="h-80" />
</div>

<div class="py-3 px-2" on:click={getContents}>Submit</div>

<style>
	.ql-editor {
		min-height: 200px;
	}
</style>
