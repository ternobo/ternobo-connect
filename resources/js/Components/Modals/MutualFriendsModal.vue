<template>
	<b-modal v-model="showModal" hide-footer @show="onShown" :title="__.choice('user-profile.mutual-friends', 2)" size="md" :centered="true">
		<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
		<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
			<div class="d-flex flex-column justify-center align-items-center w-100 err">
				<i @click="onShown" class="hover-dark text-muted material-icons-outlined">refresh</i>
				<br />
				<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
			</div>
		</div>
		<div class="likes-list" v-else v-infinite-scroll="loadMore" :infinite-scroll-distance="10">
			<div v-for="page in pages" :key="'friend_' + pageId + '_' + page.slug" class="like-item">
				<wire-link :href="'/' + page.slug" class="userinfo">
					<lazy-image class="mb-0" :loadingColor="skeletonOptions.profileColor" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :src="page.profile"></lazy-image>
					<div class="page-name d-flex flex-column">
						<strong class="d-flex align-items-center">
							<user-badges class="me-1" :onlyOne="true" :badgeStatus="page.badge_status" />
							{{ page.name }}
						</strong>
						<span class="shortbio"> {{ page.short_bio }} </span>
					</div>
				</wire-link>
				<connetion-buttons :page="page" :blocked="page.blocked"></connetion-buttons>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import ConnetionButtons from "../buttons/ConnetionButtons.vue";
import FollowButton from "../buttons/FollowButton.vue";
import LazyImage from "../LazyImage.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
import PagesListLoading from "../Skeletons/PagesListLoading.vue";
export default {
	props: {
		pageId: {
			default: 0,
			required: true,
		},
	},
	data() {
		return {
			error: false,
			loading: true,
			usersPaginate: null,
			pages: [],
			next_page_url: null,
			loadingMore: false,

			typeBasedData: {},
		};
	},
	methods: {
		onShown() {
			this.loading = true;
			this.error = false;

			axios
				.post("/mutual-friends", {
					page_id: this.pageId,
					all: true,
				})
				.then((response) => {
					this.pages = response.data.mutuals.list;
				})
				.catch((error) => {
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
	},
	components: { LazyImage, FollowButton, LoadingSpinner, PagesListLoading, ConnetionButtons },

	mixins: [ModalMixin],
	name: "MutualFriendsModal",
};
</script>

<style></style>
