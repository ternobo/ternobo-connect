<template>
	<b-modal v-if="$store.state.user != null" @show="onShown" v-model="showModal" hide-footer :title="__.get('user-profile.endorse-skill')" size="md" :centered="true">
		<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
		<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
			<div class="d-flex flex-column justify-center align-items-center w-100 err">
				<i @click="onShown" class="hover-dark text-muted material-icons-outlined">refresh</i>
				<br />
				<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
			</div>
		</div>
		<div class="likes-list" v-else-if="credits.length > 0" v-infinite-scroll="loadMore" :infinite-scroll-distance="10">
			<div v-for="credit in credits" :key="'credit_' + credit.id" class="like-item">
				<wire-link :href="'/' + credit.user.username" class="userinfo">
					<lazy-image class="mb-0" :class="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :imgClass="{ 'profile-sm': $root.isDesktop, 'profile-md': !$root.isDesktop }" :src="credit.user.profile"></lazy-image>
					<div class="page-name d-flex flex-column">
						<strong> {{ credit.user.name }} <i v-if="credit.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
						<span class="shortbio"> {{ credit.user.short_bio }} </span>
					</div>
				</wire-link>
				<connetion-buttons :pageId="credit.user.personal_page_id" :blocked="credit.user.blocked"></connetion-buttons>
			</div>
			<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
		</div>
		<div class="likes-list d-flex justify-content-center align-items-center" v-else>
			<span class="text-center font-16 text-grey pb-5">{{ __.get("messages.no-credit") }}</span>
		</div>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
import ModalMixin from "../../../../Mixins/Modal";
import FollowButton from "../../../buttons/FollowButton.vue";
import PagesListLoading from "../../../Skeletons/PagesListLoading.vue";

export default {
	components: { FollowButton, PagesListLoading },
	computed: {
		...mapState(["user"]),
	},
	methods: {
		loadMore($state) {
			axios
				.get(this.next_page_url)
				.then((response) => {
					const data = response.data.credits;
					if (data) {
						this.credits = this.credits.concat(data.data);
						this.next_page_url = data.next_page_url;
						$state.loaded();
					}
				})
				.catch((error) => {
					$state.error();
				})
				.then(() => {
					if (this.next_page_url == null) {
						$state.complete();
					}
				});
		},
		onShown() {
			this.loading = true;
			axios
				.get(`/skills/${this.skill}/credit`)
				.then((response) => {
					this.credits = response.data.credits.data;
					this.next_page_url = response.data.credits.next_page_url;
				})
				.catch((err) => {
					console.log(err);
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
	},
	data() {
		return {
			credits: [],
			next_page_url: null,
			loading: false,
			error: false,
		};
	},
	props: ["skill"],
	mixins: [ModalMixin],
	name: "CreditsModal",
};
</script>

<style>
</style>