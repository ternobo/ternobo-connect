<template>
	<div class="quote-editor">
		<i class="material-icons-outlined me-2">format_quote</i>
		<rich-input class="editor--text-input" ref="editor" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
	</div>
</template>

<script>
import ParagraphMixin from "./ParagraphMixin";
export default {
	mixins: [ParagraphMixin],
};
</script>

<style lang="scss">
.quote-editor {
	display: flex;
	align-items: flex-start;

	.editor--text-input {
		color: #191919;
		p {
			margin: 0;
		}
	}
}
</style>
