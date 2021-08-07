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
		focus() {
			if (!this.focus) {
				this.restore = this.saveCaretPosition(this.$refs.input);
			}
		},
	},
	methods: {
		saveCaretPosition() {
			return () => {
				this.setCaretPosition(this.$refs.input, this.getCaretPosition());
			};
		},

		getCaretPosition(context) {
			const element = context || this.$refs.input;
			var caretOffset = 0;
			var doc = element.ownerDocument || element.document;
			var win = doc.defaultView || doc.parentWindow;
			var sel;
			if (typeof win.getSelection != "undefined") {
				sel = win.getSelection();
				if (sel.rangeCount > 0) {
					var range = win.getSelection().getRangeAt(0);
					var preCaretRange = range.cloneRange();
					preCaretRange.selectNodeContents(element);
					preCaretRange.setEnd(range.endContainer, range.endOffset);
					caretOffset = preCaretRange.toString().length;
				}
			} else if ((sel = doc.selection) && sel.type != "Control") {
				var textRange = sel.createRange();
				var preCaretTextRange = doc.body.createTextRange();
				preCaretTextRange.moveToElementText(element);
				preCaretTextRange.setEndPoint("EndToEnd", textRange);
				caretOffset = preCaretTextRange.text.length;
			}
			return caretOffset;
		},

		setCaretPosition(elem, caretPos) {
			if (elem != null) {
				if (elem.createTextRange) {
					var range = elem.createTextRange();
					range.move("character", caretPos);
					range.select();
				} else {
					if (elem.selectionStart) {
						elem.focus();
						elem.setSelectionRange(caretPos, caretPos);
					} else elem.focus();
				}
			}
		},

		insertEmoji(emoji) {
			this.$refs.input.focus();
			window.document.execCommand("insertHTML", false, twemoji.parse(emoji));
			this.onInput();
		},
		onInput() {
			let text = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.input.innerHTML);
			text = TextareaParser.escapeHTML(TextareaParser.unescapeHtml(text));
			this.val = text;
			this.$emit("input", text);
			this.$nextTick(() => {
				twemoji.parse(this.$refs.input);
				this.restore();
			});
		},
	},
	data() {
		return {
			val: "",
			focus: false,
			restore: () => {},
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
