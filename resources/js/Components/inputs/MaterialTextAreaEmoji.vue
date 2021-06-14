<template>
	<div class="material-textfield material-textarea" :class="{ active: focus || val.trim().length > 0 }">
		<div contenteditable :class="inputClass" @input="onInput" ref="input" @focus="focus = true" @blur="focus = false" v-max-contenteditable="1500" :maxlength="maxlength" class="input"></div>
		<label v-if="placeholder !== undefined">{{ placeholder }}</label>
	</div>
</template>

<script>
import TextareaParser from "../NewPost/Editor/TextareaParser";

export default {
	created() {
		this.val = this.value;
	},
	mounted() {
		this.$refs.input.innerText = this.val;
	},
	watch: {
		value(newValue) {
			if (!Boolean(newValue)) {
				this.val = newValue;
				this.$refs.input.innerText = newValue;
				this.$nextTick(() => {
					twemoji.parse(this.$refs.input);
				});
			}
		},
	},
	methods: {
		onInput(e) {
			let text = TextareaParser.replaceEmojiWithAltAttribute(e.target.innerHTML);
			text = TextareaParser.escapeHTML(TextareaParser.unescapeHtml(text));
			this.val = text;
			this.$emit("input", text);
			this.$nextTick(() => {
				twemoji.parse(this.$refs.input);
			});
		},
	},
	data() {
		return {
			val: "",
			focus: false,
		};
	},
	props: {
		minHeight: {
			type: Number,
			default: 40,
			required: false,
		},
		value: {
			default: "15000",
			required: false,
		},
		maxlength: {
			default: "15000",
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

<style>
</style>
