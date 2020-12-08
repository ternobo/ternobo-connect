<template>
	<div class="col-md-12 d-flex bg-body p-0 justify-content-end">
		<inertia-link as="div" v-if="post.type !== 'article'" class="post p-0 bg-default text-dark clickable w-100" style="text-align: justify" :href="$APP_URL + '/posts/' + post.id">
			<div class="position-relative" v-if="post.text != null && post.text.length > 0">
				<pre class="p-2 m-0" v-html="post.text"></pre>
			</div>
			<div class="media" v-if="post.medias != null">
				<lazy-image class="mb-0" :src="post.medias" />
			</div>
		</inertia-link>
		<inertia-link as="div" v-else class="post p-0 bg-default text-dark clickable w-100" style="text-align: justify" :href="$APP_URL + '/' + post.page.slug + post.id">
			<div class="post-title py-2">
				<span class="text-dark bold" :class="{ 'font-16': $root.isDesktop, 'font-14': !$root.isDesktop }">{{ post.title }}</span>
			</div>
			<div class="media" v-if="post.medias != null">
				<lazy-image class="mb-0" :src="post.medias" />
			</div>
		</inertia-link>
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
