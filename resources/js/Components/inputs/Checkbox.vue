<template>
	<div class="md-checkbox">
		<input :id="id" type="checkbox" v-model="status" :disabled="disabled" :class="inputClass" :value="value" />
		<label :for="id">
			<slot></slot>
		</label>
	</div>
</template>

<script>
export default {
	created() {
		this.status = this.value != false;
	},
	watch: {
		status() {
			this.$emit("input", this.status);
		},
		value() {
			this.status = this.value != false;
		},
	},
	props: {
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		inputClass: {
			type: [String, Array],
			default: undefined,
			required: false,
		},
		value: {
			type: [String, Number, Boolean, Object, Array],
			default: undefined,
			required: false,
		},
	},
	data() {
		return {
			id: "",
			status: false,
		};
	},
	mounted() {
		this.id = "check_box_" + this._uid;
	},
};
</script>

<style>
</style>
