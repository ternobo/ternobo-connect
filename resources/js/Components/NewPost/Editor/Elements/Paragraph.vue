<template>
	<mentionable :max-tags="3" class="textarea-content w-100" @click="focus">
		<div ref="editable" class="editor--text-input" :placeholder="isDefault ? __.get('content/posts.post-ph', { fname: $store.state.user.first_name }) : __.get('content/posts.enter-your-text')" contenteditable @keydown.delete="onBackspace" @blur="onBlur" @keydown="onKeyDown" @keydown.enter="addParagraph" @focus="onFocus" @paste="onPaste" @input="input"></div>
	</mentionable>
</template>

<script>
import TextareaParser from "../TextareaParser";
import Mentionable from "../../../Mentionable";
import ParagraphEditor from "ternobo-paragraph-editor/lib/TernoboEditor";

import ContentEditable from "../../../../Mixins/ContentEditable";
import { mapState } from "vuex";
export default {
	mixins: [ContentEditable],
	destroyed() {
		this.editor.doDestory();
	},
	provide: {
		replaceMention(key, value) {
			const classes = key == "@" ? "mention-item" : "text-action tag-item";
			const element = document.createElement("span");
			element.className = classes;
			element.innerHTML = key + value;
			element.contentEditable = false;
			return element;
		},
	},
	methods: {
		addParagraph(e) {
			if (!e.shiftKey) {
				e.preventDefault();
				this.$emit("addParagraph");
			}
		},
		onBackspace() {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.unescapeHtml(content);

			if (content < 1) {
				this.$emit("delete");
			}
		},
		onFocus() {
			this.$emit("focus", this);
			this.$refs.editable.dir = "auto";
		},
		onBlur() {
			if (this.updateContent().trim().length < 1) {
				this.$refs.editable.removeAttribute("dir");
			} else {
				this.$refs.editable.dir = "auto";
			}
		},
		insertEmoji(emoji) {
			document.execCommand("insertHTML", false, twemoji.parse(emoji));
			this.input();
		},
		updateContent() {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.replaceTextEditorMentions(TextareaParser.unescapeHtml(content));
			this.$emit("update:content", content);
			return content;
		},
		onPaste(e) {
			e.preventDefault();
			var text = (e.originalEvent || e).clipboardData.getData("text/plain");
			let len = this.$refs.editable.innerText.length + text.length;

			if (len > this.max) {
				text = text.substr(0, this.max - this.$refs.editable.innerText.length);
			}

			document.execCommand("insertHTML", false, text);

			this.updateContent();

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
			this.updateContent();
			this.$nextTick(() => {
				twemoji.parse(this.$refs.editable);
				this.fixDirection();
			});
		},
		fixDirection() {
			HTMLCollection.prototype.forEach = Array.prototype.forEach;
			this.$refs.editable.children.forEach((item) => {
				item.dir = "auto";
			});
		},
		focus() {
			this.$refs.editable.focus();
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
		isDefault: {
			default: false,
		},
		meta: {
			default: null,
		},
		content: {
			default: "",
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
		this.$refs.editable.innerHTML = this.content;
		this.updateContent();

		this.editor = new ParagraphEditor(this.$refs.editable, {
			toolbar: {
				bold: {
					text: "format_bold",
					class: "material-icons",
					onActive: () => {
						return document.queryCommandState("bold");
					},
					action: () => {
						document.execCommand("bold", false, "");
					},
				},
				italic: {
					text: "format_italic",
					class: "material-icons",
					onActive: () => {
						return document.queryCommandState("italic");
					},
					action: () => {
						document.execCommand("italic", false, "");
					},
				},
				strikeThrough: {
					text: "strikethrough_s",
					class: "material-icons",
					onActive: () => {
						return document.queryCommandState("strikeThrough");
					},
					action: () => {
						document.execCommand("strikeThrough", false, "");
					},
				},
				underline: {
					text: "format_underlined",
					class: "material-icons",
					onActive: () => {
						return document.queryCommandState("underline");
					},
					action: () => {
						document.execCommand("underline", false, "");
					},
				},

				link: {
					text: "link",
					class: "material-icons",
					onActive: () => {
						var sel = window.getSelection();
						var range = sel.getRangeAt(0).cloneRange();
						return range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "a";
					},
					action: (e) => {
						var sel = window.getSelection();
						if (sel.rangeCount) {
							var range = sel.getRangeAt(0).cloneRange();
							let element = range.commonAncestorContainer.parentElement;
							if (element.tagName.toLowerCase() == "a") {
								document.execCommand("unlink", false, null);
								e.editor.selectionToLink("subdirectory_arrow_left", "Enter Link", element.href);
							} else {
								e.editor.selectionToLink("subdirectory_arrow_left", "Enter Link");
							}
						}
					},
				},
				code: {
					text: "code",
					class: "material-icons",
					onActive: () => {
						var sel = window.getSelection();
						var range = sel.getRangeAt(0).cloneRange();
						return range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "code";
					},
					action: () => {
						var sel = window.getSelection();
						if (sel.rangeCount) {
							var range = sel.getRangeAt(0).cloneRange();
							if (range.commonAncestorContainer.parentElement.tagName.toLowerCase() == "code") {
								document.execCommand("removeFormat", false, null);
							} else {
								range.surroundContents(document.createElement("code"));
								sel.removeAllRanges();
								sel.addRange(range);
							}
						}
					},
				},

				superscript: {
					text: "superscript",
					class: "material-icons",
					onActive: () => {
						return document.queryCommandState("superscript");
					},
					action: () => {
						document.execCommand("superscript", null, "");
					},
				},
			},
		});

		this.$nextTick(() => {
			if (this.$refs.editable) {
				twemoji.parse(this.$refs.editable);
				this.$refs.editable.focus();
			}
		});
	},
	components: { Mentionable },
};
</script>

<style>
</style>
