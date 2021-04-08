<template>
	<div class="textarea-content w-100">
		<div ref="editable" class="editor--text-input" contenteditable @input="input"></div>
		<div ref="editableHighlight" class="editor--text-input highlight" placeholder="متن خو را وارد کنید"></div>
	</div>
</template>

<script>
import TextareaContent from "../../../inputs/TextareaContent.vue";
import Tribute from "tributejs";
export default {
	methods: {
		input() {
			this.$refs.editableHighlight.innerHTML = this.$refs.editable.innerHTML.replace(/\B#(\S+)/gu, "<span class='text-action'>#$1</span>").replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");
			this.$emit("update:content", this.$refs.editable.innerText);
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
	},
	mounted() {
		document.execCommand("defaultParagraphSeparator", false, "br");
		this.$refs.editable.innerHTML = this.content;
		this.$refs.editableHighlight.innerHTML = this.$refs.editable.innerHTML.replace(/\B#(\S+)/gu, "<span class='text-action'>#$1</span>").replace(/\B@(\w+)/gu, "<span class='mention-item'>@$1</span>");

		let tribute = new Tribute({
			collection: [
				{
					trigger: "@",
					values: this.serachForMentions,
					selectTemplate: (item) => "@" + item.original.key,
					menuItemTemplate: function (item) {
						return item.original.name;
					},
				},
				{
					trigger: "#",
					values: this.searchForTags,
					noMatchTemplate: function () {
						return '<span style:"visibility: hidden;"></span>';
					},
					selectTemplate: (item) => "#" + item.original.key,
				},
			],
		});
		tribute.attach(this.$refs.editable);
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
