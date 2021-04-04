<template>
	<div class="slide-item"><slot></slot><i v-if="!hideDelete" class="delete-icon material-icons" @click="$emit('delete')">delete_outline</i></div>
</template>

<script>
export default {
	props: {
		hideDelete: {
			default: false,
		},
	},
};
</script>

<style>
</style>