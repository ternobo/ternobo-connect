<template>
	<li role="presentation">
		<a role="menuitem" target="_self" class="dropdown-item clickable" @click="emitClick">
			<slot></slot>
		</a>
	</li>
</template>

<script>
export default {
	methods: {
		emitClick(e) {
			this.$emit("click", e);
		},
	},
};
</script>

<style>
</style>