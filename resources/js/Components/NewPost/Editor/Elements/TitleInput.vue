<template>
	<div class="contenteditable-input title-input">
		<div contenteditable @focus="onFocus" v-max-contenteditable="112" @keypress.enter.prevent @keydown.enter.prevent @input="input" ref="input" class="w-100 shadow-0">{{ text }}</div>
	</div>
</template>

<script>
import TextareaParser from "../TextareaParser";
export default {
	props: ["content", "meta"],
	created() {
		this.text = this.content;
	},
	mounted() {
		this.$nextTick(() => {
			twemoji.parse(this.$refs.input);
		});
	},
	data() {
		return {
			text: "",
		};
	},
	methods: {
		input() {
			twemoji.parse(this.$refs.input);
			this.$emit("update:content", TextareaParser.escapeHTML(TextareaParser.replaceEmojiWithAltAttribute(this.$refs.input.innerHTML)));
		},
		onFocus() {
			this.$emit("focus", this);
		},
		insertEmoji(emoji) {
			this.$refs.input.innerHTML += emoji;
			this.$nextTick(() => {
				this.input();
			});
		},
	},
};
</script>

<style>
</style>
