<template>
	<mentionable class="textarea-content w-100">
		<div ref="editable" class="editor--text-input" contenteditable @keydown="onKeyDown" @keydown.enter="addParagraph" dir="auto" @focus="onFocus" @paste="onPaste" @input="input" @apply="addTag"></div>
		<div ref="editableHighlight" class="editor--text-input highlight" dir="auto" :placeholder="__.get('content/posts.enter-your-text')"></div>
	</mentionable>
</template>

<script>
import TextareaParser from "../TextareaParser";
import Mentionable from "../../../Mentionable";
import ParagraphEditor from "ternobo-paragraph-editor/lib/TernoboEditor";
export default {
	destroyed() {
		this.editor.doDestory();
	},
	methods: {
		addParagraph(e) {
			e.preventDefault();
			this.$emit("addParagraph");
		},
		onFocus() {
			this.$emit("focus", this);
		},
		insertEmoji(emoji) {
			document.execCommand("insertHTML", false, twemoji.parse(emoji));
			this.input();
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
			editor: null,
		};
	},
	props: {
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
	mounted() {
		document.execCommand("defaultParagraphSeparator", false, "p");
		this.$refs.editable.innerHTML = this.content;
		this.updateHighlight();

		this.editor = new ParagraphEditor(this.$refs.editable, {
			toolbar: {
				bold: {
					text: "format_bold",
					class: "material-icons",
					onActive: ()=>{
						return document. queryCommandState("bold");
					},
					action: () => {
						document.execCommand("bold", null, "");
					},
				},
				italic: {
					text: "format_italic",
					class: "material-icons",
					onActive: ()=>{
						return document. queryCommandState("italic");
					},
					action: () => {
						document.execCommand("italic", null, "");
					},
				},
				strikeThrough: {
					text: "strikethrough_s",
					class: "material-icons",
					onActive: ()=>{
						return document. queryCommandState("strikeThrough");
					},
					action: () => {
						document.execCommand("strikeThrough", null, "");
					},
				},
				superscript: {
					text: "superscript",
					class: "material-icons",
					onActive: ()=>{
						return document. queryCommandState("superscript");
					},
					action: () => {
						document.execCommand("superscript", null, "");
					},
				},
				underline: {
					text: "format_underlined",
					class: "material-icons",
					action: () => {
						document.execCommand("underline", null, "");
					},
				},
			},
		});

		this.$nextTick(() => {
			twemoji.parse(this.$refs.editable);
		});

		this.$nextTick(() => {
			this.$refs.editable.focus();
		});
	},
	components: { Mentionable },
};
</script>

<style>
</style>
