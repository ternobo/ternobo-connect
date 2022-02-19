<template>
	<div class="community-tag-header">
		<lazy-image :src="`/${community.cover}`" class="community-cover" />
		<div class="tag-card">
			<div class="d-flex align-items-center">
				<img :src="`/${community.icon}`" width="24" class="me-3" />
				<div class="d-flex flex-column pe-2">
					<strong class="tag">
						{{ community.name }}
					</strong>

					<div>
						<small>{{ totalPosts }} {{ __.choice("application.post", totalPosts) }}</small>
					</div>
				</div>
			</div>
			<loading-button class="btn" @click="follow" :class="{ 'btn-secondary': !isFollowed }" :loading="loading">{{ isFollowed ? __.get("application.following") : __.get("application.follow") }}</loading-button>
		</div>

		<!-- Top Users !-->
		<div class="top-active-users" v-if="!hideTopUsers">
			<h2 class="mb-5 text-center">{{ __.get("application.top-active-users") }}</h2>
			<div class="flex-container" v-if="loadingTopUsers">
				<div v-for="i in 5" :key="`skeleton_top_user_${i}`">
					<div class="d-flex align-items-center flex-row card p-3">
						<skeleton circle :loadingColor="skeletonOptions.profileColor" height="40px" width="40px" class="me-4"></skeleton>
						<skeleton width="100px"></skeleton>
					</div>
				</div>
			</div>
			<div class="flex-container" v-else>
				<div v-for="page in topActiveUsers" :key="`skeleton_top_user_${page.id}`">
					<div class="d-flex align-items-center card p-3">
						<profile-peeking :showBadges="true" class="w-100" position="bottom" :page="page"></profile-peeking>
					</div>
				</div>
			</div>
		</div>

		<!-- Related Hashtags !-->
		<div class="top-active-users" v-if="!hideRelatedTags">
			<h2 class="mb-5 text-center">{{ __.get("application.related-hashtags") }}</h2>
			<div class="flex-container" v-if="loadingRelatedTags">
				<div v-for="i in 5" :key="`skeleton_top_user_${i}`">
					<div class="d-flex align-items-center card p-3">
						<skeleton circle :loadingColor="skeletonOptions.profileColor" height="40px" width="40px" class="me-4"></skeleton>
						<skeleton width="100px"></skeleton>
					</div>
				</div>
			</div>
			<div class="flex-container" v-else>
				<div v-for="hashtag in relatedTags" :key="`skeleton_top_related_tags_${hashtag}`">
					<div class="d-flex align-items-center card p-3">
						<wire-link :href="`/tags/${hashtag}`" class="text-action">#{{ hashtag }}</wire-link>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ProfilePeeking from "../App/ProfilePeeking/ProfilePeeking.vue";
import Skeleton from "../Skeleton/Skeleton.vue";
import HashtagMixin from "./HashtagMixin";
export default {
	components: { Skeleton, ProfilePeeking },
	mixins: [HashtagMixin],
	props: {
		community: {
			required: true,
		},
		totalPosts: {
			required: true,
		},
		tag: {
			require: true,
		},
	},
	mounted() {
		axios
			.get(`/community/${this.tag}/top-users`)
			.then((response) => {
				if (response.data.status) {
					this.topActiveUsers = response.data.data;
					if (this.topActiveUsers.length < 1) {
						this.hideTopUsers = true;
					}
				} else {
					this.hideTopUsers = true;
				}
			})
			.catch((err) => {
				this.hideTopUsers = true;
			})
			.then(() => (this.loadingTopUsers = false));

		this.loadingRelatedTags = true;
		axios
			.get(`/community/${this.tag}/related-tags`)
			.then((response) => {
				if (response.data.status) {
					this.relatedTags = response.data.data;
					if (this.relatedTags.length < 1) {
						this.hideRelatedTags = true;
					}
				} else {
					this.hideRelatedTags = true;
				}
			})
			.catch((err) => {
				this.hideRelatedTags = true;
			})
			.then(() => (this.loadingRelatedTags = false));
	},
	data() {
		return {
			hideTopUsers: false,
			topActiveUsers: [],
			loadingTopUsers: true,

			relatedTags: [],
			loadingRelatedTags: false,
			hideRelatedTags: false,
		};
	},
};
</script>