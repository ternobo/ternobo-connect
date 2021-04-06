<template>
	<wire-link class="post-body pb-2" :href="postSlug">
		<div class="images articleimg" v-if="post.medias !== null && post.medias !== undefined && post.medias.length > 0">
			<lazy-image class="m-0" style="min-height: 218px" alt="" :src="post.medias" />
		</div>
		<h4 style="margin-right: -12px !important" class="article-title">{{ post.title }}</h4>
	</wire-link>
</template>

<script>
export default {
	name: "ArticleCard",
	props: {
		post: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	computed: {
		postSlug: function () {
			let post_slug = this.post.id;
			if (this.post.slug !== null && this.post.slug.length > 0) {
				post_slug = this.post.slug;
			}
			let page_slug = this.post.page.slug;
			return this.$APP_URL + "/" + page_slug + "/" + post_slug;
		},
	},
};
</script>
