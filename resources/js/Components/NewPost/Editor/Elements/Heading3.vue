<template>
	<div class="heading-3">
		<rich-input :placeholder="__.get('editor.heading-placeholder', { num: 3 })" class="editor--text-input" ref="editor" :activeOptions="[]" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
	</div>
</template>

<script>
import HeadingMixin from "./HeadingMixin";

export default {
	mixins: [HeadingMixin],
};
</script>