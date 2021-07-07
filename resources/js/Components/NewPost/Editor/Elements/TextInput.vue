<template>
	<mentionable class="textarea-content w-100">
		<div ref="editable" class="editor--text-input" contenteditable @keydown="onKeyDown" dir="auto" @focus="onFocus" @blur="onBlur" @paste="onPaste" @input="input" @apply="addTag"></div>
		<div ref="editableHighlight" class="editor--text-input highlight" dir="auto" :placeholder="__.get('content/posts.enter-your-text')"></div>
	</mentionable>
</template>

<script>
import TextareaContent from "../../../inputs/TextareaContent.vue";
import TextareaParser from "../TextareaParser";
import Mentionable from "../../../Mentionable";
export default {
	methods: {
		saveCaretPosition() {
			return () => {
				this.setCaretPosition(this.$refs.editable, this.getCaretPosition());
			};
		},

		getCaretPosition(context) {
			const element = context || this.$refs.editable;
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

		onFocus() {
			this.restore();
			this.$emit("focus", this);
		},
		onBlur() {
			this.$emit("blur", this);
			this.restore = this.saveCaretPosition(this.$refs.editable);
		},
		insertEmoji(emoji) {
			this.$refs.editable.focus();
			const range = window.getSelection().getRangeAt(0);
			range.insertNode(document.createTextNode(emoji));
			this.input();
			this.setCaretPosition(this.$refs.editable, this.getCaretPosition() + 1);
		},
		updateHighlight() {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.unescapeHtml(content);
			let htext = content.replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");

			let tags = htext.match(/\B#(\S+)/gu)?.slice(0, 3);

			if (tags) {
				tags.forEach((tag) => {
					htext = htext.replace(tag, function (item) {
						return `<span class='text-action'>${item}</span>`;
					});
				});
			}
			this.$refs.editableHighlight.innerHTML = htext;
			return content;
		},
		addTag(value, key) {
			if (key == "#" && this.tags.length < 3) {
				this.tags.push(value.key);
			}
		},
		onPaste(e) {
			e.preventDefault();
			var text = (e.originalEvent || e).clipboardData.getData("text/plain");
			let len = this.$refs.editable.innerText.length + text.length;

			if (len > this.max) {
				text = text.substr(0, this.max - this.$refs.editable.innerText.length);
			}

			document.execCommand("insertHTML", false, text);

			this.updateHighlight();

			this.fixDirection();
		},
		onKeyDown(e) {
			let utils = {
				special: [8, 16, 17, 18, 46],
				navigational: [38, 37, 39, 40],
				isSpecial(event) {
					let result = this.special.includes(event.keyCode) || (event.ctrlKey && [90, 83, 65].includes(event.keyCode));
					return result;
				},
				isNavigational(e) {
					return this.navigational.includes(e.keyCode);
				},
			};

			let len = e.target.innerText.length;
			let hasSelection = false;
			let selection = window.getSelection();
			let isSpecial = utils.isSpecial(e);
			let isNavigational = utils.isNavigational(e);

			if (selection) {
				hasSelection = !!selection.toString();
			}
			if (isSpecial || isNavigational) {
				return true;
			} else if (len >= this.max && !hasSelection) {
				e.preventDefault();
				return false;
			}
		},
		input(e) {
			let content = this.updateHighlight();
			this.$emit("update:content", content);
			this.$nextTick(() => {
				twemoji.parse(this.$refs.editableHighlight);
				twemoji.parse(this.$refs.editable);
				this.restore();
				this.fixDirection();
			});
		},
		fixDirection() {
			HTMLCollection.prototype.forEach = Array.prototype.forEach;
			this.$refs.editable.children.forEach((item) => {
				item.dir = "auto";
			});
			this.$refs.editableHighlight.children.forEach((item) => {
				item.dir = "auto";
			});
		},
	},
	data() {
		return {
			tags: [],
			restore: () => {},
		};
	},
	props: {
		content: {
			default: "",
		},
		max: {
			default: 1200,
		},
	},
	mounted() {
		document.execCommand("defaultParagraphSeparator", false, "p");
		this.$refs.editable.innerHTML = this.content;
		this.updateHighlight();

		this.$nextTick(() => {
			twemoji.parse(this.$refs.input);
		});

		this.$nextTick(() => {
			this.$refs.editable.focus();
		});
	},
	components: { TextareaContent, Mentionable },
};
</script>

<style>
</style>
