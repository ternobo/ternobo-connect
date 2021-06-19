<template>
	<div class="post-slide">
		<Content v-for="content in slide.content" :showFullText.sync="showFullText" :content="content" :key="`content_item_${content.id}`"></Content>
	</div>
</template>

<script>
import Content from "../ContentElement";

export default {
	data() {
		return {
			showFullText: false,
		};
	},
	watch: {
		slide() {
			this.showFullText = this.fullTextProp;
		},
		fullTextProp() {
			this.showFullText = this.fullTextProp;
		},
		showFullText() {
			this.$emit("update:fullTextProp", this.showFullText);
		},
	},
	created() {
		this.showFullText = this.fullTextProp;
	},
	components: {
		Content,
	},

	props: ["slide", "fullTextProp"],
};
</script>

<style>
</style>