<template>
	<lazy-image class="mb-0" style="min-height: 150px" :src="imageUrl" />
</template>

<script>
export default {
	computed: {
		imageUrl() {
			return typeof this.content == "object" ? URL.createObjectURL(this.content) : `${this.content}`;
		},
	},
	props: {
		content: {
			default: null,
		},
	},
};
</script>

<style>
</style>
