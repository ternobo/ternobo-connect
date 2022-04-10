<template>
	<div class="tag-page-header">
		<div class="tag-card">
			<div class="d-flex align-items-center">
				<strong class="tag" ref="tagelem">{{ tag }}</strong>
				<small>{{ totalPosts }} {{ __.choice("application.post", totalPosts) }}</small>
			</div>
			<loading-button class="btn" @click="follow" :class="{ 'btn-secondary': !isFollowed }" :loading="loading">{{ isFollowed ? __.get("application.following") : __.get("application.follow") }}</loading-button>
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