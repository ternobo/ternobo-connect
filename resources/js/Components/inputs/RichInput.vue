<template>
	<ternobo-editor ref="ternoboEditor" :editorOptions="editorOptions" :extensions="[...extensions, ...richEditorExtentions]" class="ternobo-editor" v-model="val" v-slot:default="{ editor }">
		<popup-menu :activeOptions="activeOptions" :editor="editor"></popup-menu>
	</ternobo-editor>
</template>

<script>
import { TernoboEditor, PopupMenu } from "@ternobo/ternobo-editor";
import Placeholder from "@tiptap/extension-placeholder";

export default {
	components: {
		TernoboEditor,
		PopupMenu,
	},
	methods: {
		reset() {
			this.$refs.ternoboEditor.editor.commands.clearContent();
		},
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
		placeholder: {
			default: "",
		},
		value: {
			default: null,
		},
	},
	data() {
		return {
			val: null,
			richEditorExtentions: [],
		};
	},
	created() {
		this.val = this.value ? this.value : null;
		this.richEditorExtentions = [
			Placeholder.configure({
				placeholder: this.placeholder,
			}),
		];
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