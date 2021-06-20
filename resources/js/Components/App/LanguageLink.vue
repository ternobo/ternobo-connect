<template>
	<a @click="action" :href="`/set-language?locale=${lang}`"><slot></slot></a>
</template>

<script>
export default {
	methods: {
		action(e) {
			if (window.lang == this.lang) {
				e.preventDefault();
			}
		},
	},
	props: ["lang"],
};
</script>

<style>
</style>