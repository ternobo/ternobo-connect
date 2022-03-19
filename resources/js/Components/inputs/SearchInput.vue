<template>
	<div class="input-group-icon input-group-icon_start">
		<i class="material-icons clickable" @click="iconClick">{{ icon }}</i>

		<input :type="type" v-bind="{ ...$attrs, ...$props }" autocomplete="off" ref="input" @focus="focus = true" @blur="blur" v-model="val" @input="onInput" class="form-control" :class="inputClass" />
	</div>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {
			suggestions: [],
			val: "",

			top: 0,
			left: 0,
			width: 0,
			paddingTop: 0,
			focus: false,
		};
	},
	mounted() {
		this.val = this.value;
	},
	methods: {
		blur() {
			setTimeout(() => {
				this.focus = false;
			}, 400);
		},
		iconClick() {
			if (this.val.length > 0) {
				this.$emit("search");
			} else {
				this.$refs.input.focus();
			}
		},
		onInput() {
			this.$emit("input", this.val);
		},
	},
	props: {
		inputClass: {
			default: "fill rounded",
		},
		value: {},
		icon: {
			default: "search",
		},
		type: {
			default: "text",
		},
	},
};
</script>