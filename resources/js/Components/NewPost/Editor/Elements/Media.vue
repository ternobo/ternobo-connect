<template>
	<img :src="imageUrl" />
</template>

<script>
export default {
	computed: {
		imageUrl() {
			return URL.createObjectURL(this.content);
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
