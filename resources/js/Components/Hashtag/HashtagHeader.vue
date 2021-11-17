<template>
	<div class="tag-page-header">
		<div class="tag-card">
			<div class="d-flex align-items-center">
				<strong class="tag" ref="tagelem">#{{ tag }}</strong>
				<small>{{ posts.total }} {{ __.choice("application.post", posts.total) }}</small>
			</div>
			<loading-button class="btn follow-btn" @click.native="follow" :class="{ 'btn-followed-connected': isFollowed }" :loading="loading">{{ __.get("application.follow") }}</loading-button>
		</div>
	</div>
</template>

<script>
import HashtagMixin from "./HashtagMixin";
export default {
	mixins: [HashtagMixin],
	props: {
		totalPosts: {
			required: true,
		},
		tag: {
			require: true,
		},
	},
};
</script>