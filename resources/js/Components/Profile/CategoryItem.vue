<template>
	<li class="category-badge">
		<span class="clickable" ref="name">{{ category.name }}</span>
	</li>
</template>

<script>
export default {
	props: {
		category: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style>
</style>
