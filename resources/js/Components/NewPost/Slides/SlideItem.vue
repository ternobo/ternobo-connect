<template>
	<div class="slide-item">
		<slot></slot>
		<slot name="deleteIcon">
			<i class="delete-icon material-icons" @click="$emit('delete')">delete_outline</i>
		</slot>
	</div>
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