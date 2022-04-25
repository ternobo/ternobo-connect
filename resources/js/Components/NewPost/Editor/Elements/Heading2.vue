<template>
	<div class="heading-2">
		<rich-input class="editor--text-input" ref="editor" :activeOptions="[]" :editorOptions="editorOptions" :extensions="extensions" v-model="val" />
	</div>
</template>

<script>
import HeadingMixin from "./HeadingMixin";

export default {
	mixins: [HeadingMixin],
};
</script>