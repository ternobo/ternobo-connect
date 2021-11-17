<template>
	<div class="community-tag-header">
		<lazy-image :src="community.cover" class="community-cover" />
		<div class="tag-card">
			<div class="d-flex align-items-center">
				<strong class="tag">
					<img :src="community.icon" width="24" class="me-3" />
					{{ community.name }}
				</strong>
				<small>{{ totalPosts }} {{ __.choice("application.post", totalPosts) }}</small>
			</div>
			<loading-button class="btn follow-btn" @click.native="follow" :class="{ 'btn-followed-connected': isFollowed }" :loading="loading">{{ __.get("application.follow") }}</loading-button>
		</div>

		<!-- Top Users !-->
		<div class="top-active-users">
			<h2 class="mb-5 text-center">{{ __.get("application.top-active-users") }}</h2>
			<div class="flex-container" v-if="loadingTopUsers">
				<div v-for="i in 5" :key="`skeleton_top_user_${i}`">
					<div class="d-flex align-items-center card p-3">
						<skeleton circle :loadingColor="skeletonOptions.profileColor" height="40px" width="40px" class="me-4"></skeleton>
						<skeleton width="100px"></skeleton>
					</div>
				</div>
			</div>
			<div class="flex-container" v-else>
				<div v-for="page in topActiveUsers" :key="`skeleton_top_user_${page.id}`">
					<div class="d-flex align-items-center card p-3">
						<profile-peeking class="w-100" position="bottom" :page="page"></profile-peeking>
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
				} else {
					this.hideTopUsers = true;
				}
			})
			.catch((err) => {
				this.hideTopUsers = true;
			})
			.then(() => (this.loadingTopUsers = false));
	},
	data() {
		return {
			hideTopUsers: false,
			topActiveUsers: [],
			loadingTopUsers: true,
		};
	},
};
</script>