<template>
	<mentionable class="textarea-content w-100" v-bind="$attrs" @click="focus">
		<div ref="editable" dir="auto" :placeholder="placeholder" class="editor--text-input" contenteditable @blur="onBlur" @focus="onFocus" @input="input" @keydown="onKeyDown" @paste="onPaste" @keydown.enter="addParagraph"></div>
	</mentionable>
</template>

<script>
import TextareaParser from "../TextareaParser";
import Mentionable from "../../../Mentionable";
import ParagraphEditor from "ternobo-paragraph-editor/lib/TernoboEditor";
import ParagraphEditorOptions from "./ParagraphEditorOptions";
import ContentEditable from "../../../../Mixins/ContentEditable";
import { mapState } from "vuex";

export default {
	mixins: [ContentEditable],
	destroyed() {
		this.editor.doDestory();
	},
	provide: {
		replaceMention(key, value, item) {
			const classes = key == "@" ? "mention-item" : "text-action tag-item";
			const element = document.createElement("span");
			element.className = classes;
			if (key == "#") {
				element.innerHTML = key + value;
			} else {
				element.innerHTML = item.name;
			}
			element.contentEditable = false;
			return element;
		},
	},
	methods: {
		reset() {
			this.$refs.editable.innerHTML = "";
			this.updateContent();
		},
		addParagraph(e) {
			if (!e.shiftKey && this.disableEnter) {
				e.preventDefault();
				this.$emit("addParagraph");
			}
		},
		onBackspace(e) {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.unescapeHtml(content);

			if (content.length == 0) {
				e.preventDefault();
				this.$emit("delete");
			}
		},
		onFocus() {
			this.$emit("focus", this);
			this.$refs.editable.dir = "auto";
		},
		onBlur() {
			if (this.updateContent(false).trim().length == 0) {
				this.$refs.editable.removeAttribute("dir");
			} else {
				this.$refs.editable.dir = "auto";
			}
		},
		insertEmoji(emoji) {
			document.execCommand("insertHTML", false, twemoji.parse(emoji));
			this.input();
		},
		updateContent(emit = true) {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.replaceTextEditorMentions(TextareaParser.unescapeHtml(content));
			if (emit) this.$emit("update:content", content);
			return content;
		},
		onPaste(e) {
			e.preventDefault();
			var text = (e.originalEvent || e).clipboardData.getData("text/plain");
			let len = this.$refs.editable.innerText.length + text.length;

			if (len > this.max) {
				text = text.substr(0, this.max - this.$refs.editable.innerText.length);
			}

			document.execCommand("insertText", false, text);

			this.updateContent();

			this.fixDirection();
		},

		onKeyDown(e) {
			let utils = {
				special: [8, 16, 17, 18, 46],
				delete: [8, 46],
				navigational: [38, 37, 39, 40],
				isSpecial(event) {
					let result = this.special.includes(event.keyCode) || (event.ctrlKey && [90, 83, 65].includes(event.keyCode));
					return result;
				},
				isDelete(event) {
					return this.delete.includes(event.keyCode);
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

			if (utils.isDelete(e)) {
				this.onBackspace(e);
			} else if (isSpecial || isNavigational) {
				return true;
			} else if (len >= this.max && !hasSelection) {
				e.preventDefault();
				return false;
			}
		},
		input() {
			if (this.updateContent(false) === "- ") {
				this.$emit("update:content", [""]);
				this.$emit("update:type", "bulletedList");
			} else if (this.updateContent(false) === "1- ") {
				this.$emit("update:content", [""]);
				this.$emit("update:type", "orderedList");
			} else {
				this.updateContent();
				this.$nextTick(() => {
					twemoji.parse(this.$refs.editable);
					this.fixDirection();
				});
			}
		},
		fixDirection() {
			HTMLCollection.prototype.forEach = Array.prototype.forEach;
			this.$refs.editable.children.forEach((item) => {
				item.dir = "auto";
			});
		},
		focus() {
			const el = this.$refs.editable;
			el.focus();
			if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
				var range = document.createRange();
				range.selectNodeContents(el);
				range.collapse(false);
				var sel = window.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
			} else if (typeof document.body.createTextRange != "undefined") {
				var textRange = window.document.body.createTextRange();
				textRange.moveToElementText(el);
				textRange.collapse(false);
				textRange.select();
			}
		},
	},
	data() {
		return {
			tags: [],
			editor: null,

			showList: false,
		};
	},
	props: {
		content: {
			default: "",
		},
		disableEnter: {
			default: true,
		},
		placeholder: {
			default: __.get("content/posts.enter-your-text"),
		},
		max: {
			default: 1200,
		},
	},
	computed: {
		...mapState(["shared"]),
	},
	mounted() {
		document.execCommand("defaultParagraphSeparator", false, "p");
		this.$refs.editable.innerHTML = (this.content != null ? this.content : "").replace(new RegExp(`\\[hashtag=(\\S+) \\[(.*)\\] \\]`), '<span class="text-action tag-item" contenteditable="false" data-mention="$1" dir="auto">#$1</span>');
		this.updateContent();

		this.editor = new ParagraphEditor(this.$refs.editable, ParagraphEditorOptions);
		this.editor.addActionEventListener(() => {
			window.setTimeout(this.updateContent.bind(this), 100);
		});
		this.$nextTick(() => {
			if (this.$refs.editable) {
				twemoji.parse(this.$refs.editable);
				this.$refs.editable.focus();
				this.$refs.editable.innerHTML = this.$refs.editable.innerHTML.replace(/#(\S+)/g, '<span class="text-action tag-item" contenteditable="false" data-mention="$1" dir="auto">#$1</span>').replace(/<spoiler>(.*)<\/spoiler>/g, "<spoiler class='spoiler-preview'>$1</spoiler>");
				this.fixDirection();
			}
		});
	},
	components: { Mentionable },
};
</script>