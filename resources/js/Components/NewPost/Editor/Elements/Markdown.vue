<template>
	<div>
		<div ref="editor"></div>
	</div>
</template>

<script>
import Editor from "@toast-ui/editor";
export default {
	mounted() {
		const editor = new Editor({
			el: this.$refs.editor,
			initialEditType: "markdown",
			previewStyle: "tab",
			useCommandShortcut: true,
			height: "500px",
			language: "fa-FA",
		});
	},
};
</script>

<style>
</style>