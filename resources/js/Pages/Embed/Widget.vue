<template>
	<component :isEmbed="true" class="pb-0" :is="component" :post="post"></component>
</template>

<script>
import SimpleEmbed from "../../Components/PostCard/PostCard";

export default {
	data() {
		return {
			component: SimpleEmbed,
		};
	},
	name: "Widget",
	layout: null,
	props: {
		post: {
			type: Object,
			default: undefined,
		},
	},
};
</script>

<style>
</style>
