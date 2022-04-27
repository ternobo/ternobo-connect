<template>
	<rich-input ref="editor" :placeholder="__.get('editor.text-placeholder')" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
</template>

<script>
import EditorCommandParser from "../../../../utils/EditorCommandParser";
import ParagraphMixin from "./ParagraphMixin";
export default {
	mixins: [ParagraphMixin],
	watch: {
		val() {
			if (this.val != this.value) {
				this.$emit("update:content", JSON.stringify(this.val));
				setTimeout(() => {
					const command = EditorCommandParser.parse(this.val);
					if (command != "text") {
						this.$emit("convertType", command);
					}
				}, 10);
			}
		},
	},
};
</script>