<template>
	<wire-link as="div" class="post-content clickable" style="text-align: justify" :href="$APP_URL + '/posts/' + post.id">
		<Content v-for="content in post.slides[0].content" :content="content" :key="`content_item_${content.id}`"></Content>
	</wire-link>
</template>

<script>
export default {
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>