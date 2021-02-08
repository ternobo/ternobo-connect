<template>
	<div v-show="isActive" v-if="isActive">
		<slot></slot>
	</div>
</template>

<script>
export default {
	watch: {
		isActive() {
			this.$emit("selected", this.name);
		},
		selected(newVal) {
			this.isActive = newVal;
		},
	},
	name: "Tab",
	props: {
		name: {
			required: true,
		},
		icon: {
			default: undefined,
		},
		href: {
			default: undefined,
		},
		id: {
			default: undefined,
		},
		selected: {
			default: false,
		},
	},
	data() {
		return {
			isActive: false,
		};
	},
	computed: {},
	mounted() {
		this.isActive = this.selected;
	},
};
</script>

<style>
</style>
