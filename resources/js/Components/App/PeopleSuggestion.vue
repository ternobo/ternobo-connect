<template>
	<div class="people-sugestion" :class="{ nofollow: !$store.state.shared.fullAccess }">
		<profile-peeking :page="page" v-if="type == 'page'" />
		<FollowButton class="btn-icon btn-md" :page="page" v-if="type == 'page'">
			<template v-slot:default="{ followed }">
				<i class="material-icons font-16" v-if="followed">remove</i>
				<i class="material-icons font-16" v-else>add</i>
			</template>
		</FollowButton>

		<!-- Community Tag Suggestion !-->
		<wire-link :href="`/tags/${page.tag}`" class="community-tag-suggestion d-flex" v-if="type == 'tag'">
			<lazy-image :loadingColor="skeletonOptions.profileColor" class="community-icon" :src="assetURL(page.icon)" />
			<div class="flex-column d-flex">
				<strong class="tag-name">
					<span> {{ page.name }}</span>
				</strong>
				<small class="hashtag-name">#{{ page.tag }}</small>
			</div>
		</wire-link>
		<loading-button class="btn btn-icon btn-md" @click="follow" :class="{ 'btn-secondary': !isFollowed }" v-if="type == 'tag'" :loading="loading">
			<i class="material-icons font-16" v-if="isFollowed">remove</i>
			<i class="material-icons font-16" v-else>add</i>
		</loading-button>
	</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton";
import ProfilePeeking from "./ProfilePeeking/ProfilePeeking.vue";
export default {
	props: {
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
	mounted() {
		this.isFollowed = this.page.is_followed;
	},
	components: {
		FollowButton,
		ProfilePeeking,
	},
	name: "PeopleSuggestion",
	computed: {
		type() {
			if (this.page?.type) {
				return this.page.type;
			}
			return "page";
		},
	},
	methods: {
		follow() {
			this.loading = true;
			axios
				.post(`/tags/${this.page.tag}/follow`)
				.then((response) => {
					this.isFollowed = response.data.follow;
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.connection-error"));
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	data() {
		return {
			loading: false,
			isFollowed: false,
		};
	},
};
</script>

<style lang="scss">
.followsuggest-btn {
	min-height: 24px !important;
	min-width: 24px !important;
	width: 24px !important;
	height: 24px;
	padding: 0 !important;
	margin: 0;
	display: flex !important;
	align-items: center;
	justify-content: center;
	> span {
		font-size: 16px;
		font-weight: 600;
		font-family: "Open Sans";
		display: flex;
		align-items: center;
	}
}
</style>
