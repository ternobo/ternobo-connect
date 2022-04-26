<template>
	<ternobo-editor ref="ternoboEditor" :editorOptions="editorOptions" :extensions="extensions" class="ternobo-editor" v-model="val" v-slot:default="{ editor }">
		<popup-menu :activeOptions="activeOptions" :editor="editor"></popup-menu>
	</ternobo-editor>
</template>

<script>
import { TernoboEditor, PopupMenu } from "@ternobo/ternobo-editor";
export default {
	components: {
		TernoboEditor,
		PopupMenu,
	},
	methods: {
		focus() {
			this.$refs.ternoboEditor.editor.chain().focus();
		},
	},
	props: {
		extensions: {
			type: Array,
			default: () => {
				return [];
			},
		},
		activeOptions: {
			default: () => ["bold", "italic", "underline", "strike", "code", "link", "superscript", "spoiler"],
		},
		editorOptions: {
			type: Object,
			default: () => {
				return {};
			},
		},
		value: {
			default: () => {
				return {
					content: [],
					type: "doc",
				};
			},
		},
	},
	data() {
		return {
			val: {
				content: [],
				type: "doc",
			},
		};
	},
	created() {
		this.val = this.value ? this.value : "";
	},
	watch: {
		val() {
			if (this.val != this.value) {
				this.$emit("input", this.val);
			}
		},
	},
};
</script>

<style>
</style>