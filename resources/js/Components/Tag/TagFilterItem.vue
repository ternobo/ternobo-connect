<template>
	<div class="tag-filter__item">
		{{ tag }}
	</div>
</template>

<script>
export default {
	props: {
		tag: {
			required: true,
		},
	},
};
</script>

<style>
</style>