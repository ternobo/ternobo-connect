<template>
	<ternobo-editor ref="ternoboEditor" :editorOptions="editorOptions" :extensions="extensions" class="ternobo-editor" v-model="val" v-slot:default="{ editor }">
		<popup-menu :editor="editor"></popup-menu>
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
		this.val = this.value
			? this.value
			: {
					content: [],
					type: "doc",
			  };
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