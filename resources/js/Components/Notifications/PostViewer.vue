<template>
	<wire-link class="post-content clickable" style="text-align: justify" :href="$APP_URL + '/posts/' + post.id">
		<Content v-for="content in post.slides[0].content" :hideMore="true" :content="content" :key="`content_item_${content.id}`"></Content>
	</wire-link>
</template>

<script>
import Content from "../PostCard/ContentElement";
export default {
	components: { Content },
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>