<template>
	<div class="material-textfield">
		<input v-if="noSpace" :type="type" @keydown.space.prevent placeholder=" " :class="[inputClass, { invalid: invalid }]" @blur="check" @focus="onFocus" @input="$emit('input', val)" v-model="val" :maxlength="maxlength" class="input" />
		<input v-else :type="type" :placeholder="inputPlaceholder ? inputPlaceholder : ' '" :class="[inputClass, { invalid: invalid }]" @blur="check" @focus="onFocus" @input="$emit('input', val)" v-model="val" :maxlength="maxlength" class="input" />
		<label class="d-flex" v-if="placeholder !== undefined">{{ placeholder }} <span class="text-action" v-if="showStar">*</span></label>
		<slot></slot>
	</div>
</template>

<script>
export default {
	computed: {
		showStar() {
			return this.required && !this.focus && !Boolean(this.val);
		},
	},
	methods: {
		onFocus() {
			this.$emit("focus");
			this.focus = true;
		},
		check() {
			this.$emit("blur");
			this.focus = false;
			if (this.notValid) {
				this.invalid = true;
			} else {
				this.invalid = false;
			}
		},
	},
	created() {
		this.val = this.value;
	},
	watch: {
		value() {
			this.val = this.value;
		},
	},
	data() {
		return {
			val: "",
			invalid: false,
			focus: false,
		};
	},
	props: {
		noSpace: {
			type: Boolean,
			default: false,
			required: false,
		},
		notValid: {
			type: Boolean,
			default: false,
			required: false,
		},
		value: {
			type: String,
			default: "",
			required: false,
		},
		required: {
			type: Boolean,
			default: false,
			required: false,
		},
		type: {
			type: String,
			default: "text",
			required: false,
		},
		maxlength: {
			type: [Number, String],
			default: 15000,
			required: false,
		},
		inputPlaceholder: {
			type: String,
			default: undefined,
			required: false,
		},
		inputClass: {
			type: String,
			default: "",
			required: false,
		},
		placeholder: {
			type: String,
			default: undefined,
			required: false,
		},
	},
};
</script>
