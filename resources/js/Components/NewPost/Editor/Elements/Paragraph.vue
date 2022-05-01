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
					if (command == "action") {
						this.$emit("showMenu");
					} else if (command == "hideAction") {
						this.$emit("hideMenu");
					} else if (command != "text") {
						this.$emit("convertType", command);
					} else {
						this.$emit("hideMenu");
					}
				}, 10);
			}
		},
	},
};
</script>