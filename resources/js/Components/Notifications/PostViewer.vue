<template>
	<wire-link as="div" class="post-content clickable" style="text-align: justify" :href="$APP_URL + '/posts/' + post.id">
		<div class="position-relative" v-if="post.text != null && post.text.length > 0">
			<pre class="m-0" v-html="post.text"></pre>
		</div>
		<div class="media" v-if="post.medias != null">
			<lazy-image class="mb-0" :src="post.medias" />
		</div>
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