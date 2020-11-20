<template>
	<div class="col-md-12 d-flex bg-body p-0 justify-content-end">
		<div v-if="post.type === 'post'" class="post p-0 bg-default text-dark clickable w-100" style="text-align: justify" @click="window.location = $APP_URL + '/posts/' + post_id">
			<div class="more-content position-relative">
				<pre class="p-2 m-0" v-html="post.text"></pre>
			</div>
			<div class="media" v-if="post.medias != null">
				<lazy-image :src="post.medias" />
			</div>
		</div>
		<div v-else class="post p-0 bg-default text-dark clickable w-100" style="text-align: justify" @click="window.location = $APP_URL + '/articles/' + post_id">
			<div class="post-title py-2 text-left">
				<text class="text-dark font-16 bold">{{ post.title }}</text>
			</div>
			<div class="media" v-if="post.medias != null">
				<lazy-image :src="post.medias" />
			</div>
		</div>
	</div>
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
