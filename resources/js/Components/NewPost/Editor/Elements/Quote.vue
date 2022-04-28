<template>
	<div class="quote-editor">
		<rich-input :placeholder="__.get('editor.quote-placeholder')" class="editor--text-input" ref="editor" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
	</div>
</template>

<script>
import ParagraphMixin from "./ParagraphMixin";
export default {
	mixins: [ParagraphMixin],
};
</script>