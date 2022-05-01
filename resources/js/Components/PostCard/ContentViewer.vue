<template>
	<div v-html="htmlContent"></div>
</template>

<script>
export default {
	props: ["content"],
	data() {
		return {
			htmlContent: "",
		};
	},
	created() {
		this.htmlContent = ContentRenderer.render(this.content);
	},
};
</script>