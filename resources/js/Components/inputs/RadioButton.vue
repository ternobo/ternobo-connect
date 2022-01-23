<template>
	<div class="d-flex">
		<div class="md-checkbox clickable" @click="val = theValue.value" v-for="theValue in values" :key="'radio_button_uid_' + _uid + '__' + theValue.value">
			<input type="radio" name="radio" :checked="theValue.value == val" :value="theValue.value" />
			<label class="text-dark font-demibold">
				{{ theValue.label }}
			</label>
		</div>
	</div>
</template>

<script>
export default {
	watch: {
		val() {
			this.$emit("input", this.val);
		},
	},
	created() {
		this.val = this.value;
	},
	data() {
		return {
			id: "",
			val: undefined,
		};
	},
	mounted() {
		this.id = this._uid;
	},
	props: {
		value: {
			type: String,
			default: undefined,
			required: false,
		},
		values: {
			type: Array,
			default: () => {
				return [];
			},
			required: true,
		},
	},
};
</script>

<style>
</style>
