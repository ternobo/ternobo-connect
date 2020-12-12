<template>
	<b-modal v-model="showModal" hide-footer @show="onShown" title="دوستان مشترک‌" size="md" :centered="true">
		<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-if="loading || error">
			<loading-spinner v-if="loading"></loading-spinner>
			<div class="d-flex flex-column justify-center align-items-center w-100 err" v-if="error">
				<i @click="onShown" class="hover-dark text-muted material-icons-outlined">refresh</i>
				<br />
				<span class="text-muted">خطا در برقراری ارتباط</span>
			</div>
		</div>
		<div class="likes-list" v-if="!loading && !error">
			<div v-for="user in users" :key="'friend_' + pageId + '_' + user.username" class="like-item">
				<inertia-link :href="'/' + user.username" class="userinfo">
					<lazy-image class="mb-0" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :src="user.profile"></lazy-image>
					<div class="page-name d-flex flex-column">
						<strong> {{ user.name }} <i v-if="user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
						<span class="shortbio"> {{ user.short_bio }} </span>
					</div>
				</inertia-link>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import FollowButton from "../buttons/FollowButton.vue";
import LazyImage from "../LazyImage.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
	watch: {
		usersPaginate(newValue) {
			this.users = newValue.data;
			this.next_page_url = newValue.next_page_url;
		},
	},
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
			users: [],
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
					this.users = response.data.mutuals.list;
				})
				.catch((error) => {
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
	},
	components: { LazyImage, FollowButton, LoadingSpinner },

	mixins: [ModalMixin],
	name: "MutualFriendsModal",
};
</script>

<style></style>
