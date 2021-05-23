<template>
	<div class="post-slide">
		<Content v-for="content in slide" :content="content" :key="`content_item_${content.id}`"></Content>
	</div>
</template>

<script>
import Content from "../ContentElement";

export default {
	components: {
		Content,
	},
	props: ["slide"],
};
</script>

<style>
</style>