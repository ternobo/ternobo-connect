<template>
	<label class="toggle">
		<input class="toggle-checkbox" type="checkbox" :disabled="disabled" checked v-model="checked" />
		<div class="toggle-switch" :class="{ disabled: disabled }"></div>
	</label>
</template>

<script>
export default {
	watch: {
		checked() {
			this.$emit("input", this.checked);
		},
		value() {
			this.checked = this.value;
		},
	},
	props: ["value", "disabled"],
	created() {
		this.checked = this.value;
	},
	data() {
		return {
			checked: false,
		};
	},
};
</script>

<style>
</style>