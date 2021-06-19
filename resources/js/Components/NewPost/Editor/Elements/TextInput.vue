<template>
	<div class="textarea-content w-100">
		<div ref="editable" class="editor--text-input" contenteditable @keydown="onKeyDown" @paste="onPaste" @input="input"></div>
		<div ref="editableHighlight" class="editor--text-input highlight" :placeholder="__.get('content/posts.enter-your-text')"></div>
	</div>
</template>

<script>
import TextareaContent from "../../../inputs/TextareaContent.vue";
import Tribute from "tributejs";
import TextareaParser from "../TextareaParser";
export default {
	methods: {
		onPaste(e) {
			e.preventDefault();

			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.unescapeHtml(content);

			this.$refs.editableHighlight.innerHTML = content.replace(/\B#(\S+)/gu, "<span class='text-action'>#$1</span>").replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");

			// get text representation of clipboard
			var text = (e.originalEvent || e).clipboardData.getData("text/plain");
			let len = text.length + content.length;

			let contentLen = content.length;

			if (contentLen >= this.max) {
				return;
			} else if (len >= this.max) {
				text = text.substr(0, this.max - contentLen);
			}
			// insert text manually
			document.execCommand("insertHTML", false, text);
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

			let len = e.target.innerText.trim().length;
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
		input() {
			let content = TextareaParser.replaceEmojiWithAltAttribute(this.$refs.editable.innerHTML);
			content = TextareaParser.unescapeHtml(content);
			this.$refs.editableHighlight.innerHTML = content.replace(/\B#(\S+)/gu, "<span class='text-action'>#$1</span>").replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");

			this.$emit("update:content", content);
			this.$nextTick(() => {
				twemoji.parse(this.$refs.editableHighlight);
				twemoji.parse(this.$refs.editable);
			});
		},
		searchForTags(text, cb) {
			axios.get(this.$APP_URL + "/gettags?term=" + text + "&q=" + text).then((response) => {
				let data = response.data;
				cb(data.results);
			});
		},
		serachForMentions(text, cb) {
			axios.post("/slugsearch", { q: text }).then((response) => {
				let data = response.data;
				cb(data.pages);
			});
		},
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
		document.execCommand("defaultParagraphSeparator", false, "br");
		this.$refs.editable.innerHTML = TextareaParser.unescapeHtml(this.content);
		this.$refs.editableHighlight.innerHTML = this.$refs.editable.innerHTML.replace(/\B#(\S+)/gu, "<span class='text-action'>#$1</span>").replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");

		let tribute = new Tribute({
			collection: [
				{
					trigger: "@",
					values: this.serachForMentions,
					selectTemplate: (item) => "@" + item.original.key,
					noMatchTemplate: "HI",
					menuItemTemplate: function (item) {
						return item.original.name;
					},
				},
				{
					trigger: "#",
					values: this.searchForTags,
					noMatchTemplate: null,
					selectTemplate: (item) => "#" + item.original.key,
				},
			],
		});
		tribute.attach(this.$refs.editable);
		window.maxlengthContentEditableLib();
	},
	watch: {
		text(newValue) {
			this.$emit("input", newValue);
		},
	},
	components: { TextareaContent },
};
</script>

<style>
</style>
