<template>
	<div class="textarea-content">
		<div :class="editableClass" :placeholder="placeholder" @keypress="onEnter" ref="editable" contenteditable @focus="showPlaceholder = false" @blur="onBlur" @input="input"></div>
	</div>
</template>
<script>
export default {
	created() {
		this.text = this.value;
	},
	mounted() {
		this.$refs.editable.innerText = this.value;
	},
	watch: {
		text() {
			this.$emit("input", this.text);
		},
	},
	data() {
		return {
			text: null,
			showPlaceholder: true,

			stopTypingTimeout: null,
		};
	},
	methods: {
		clear() {
			this.text = null;
			this.$refs.editable.innerText = "";
		},
		onEnter(e) {
			if (e.keyCode == 13) {
				this.$emit("input", this.text);
			}
			this.$nextTick(() => {
				this.$emit("keypress", e);
			});
		},
		onBlur() {
			if (this.text == "" || this.text == null) {
				this.showPlaceholder = true;
			}
			this.$emit("input", this.text);
		},
		input(e) {
			this.text = e.target.innerText;
		},
	},
	props: {
		editableClass: {
			default: null,
		},
		value: {
			default: "",
		},
		placeholder: {
			default: "",
		},
	},
};
</script>

<style>
</style>
