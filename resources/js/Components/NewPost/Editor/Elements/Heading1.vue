<template>
	<div class="heading-1">
		<rich-input :placeholder="__.get('editor.title-placeholder')" class="editor--text-input" ref="editor" :activeOptions="[]" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
	</div>
</template>

<script>
import HeadingMixin from "./HeadingMixin";

export default {
	mixins: [HeadingMixin],
};
</script>