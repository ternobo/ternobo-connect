<template>
	<div>
		<followed-tags-modal :page="page" :show.sync="showTags" @hide="showModal = true"></followed-tags-modal>
		<b-modal v-model="showModal" @show="onShow" :modal-class="{ 'opacity-0': showTags }" hide-footer :title="__.get('user-profile.network')" size="md" :centered="true">
			<div class="input-group-icon mb-4">
				<input class="form-control fill rounded xsm-input" v-model="search" :placeholder="__.get('application.search')" />
				<i class="material-icons-outlined">search</i>
			</div>
			<tabs @selected="tabSelect" tabsClass="connections-tab" :centered="false" :compact="true">
				<tab :name="__.get('user-profile.followers')" id="followers" :selected="current_tab == 'followers'">
					<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
					<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
						<div class="d-flex flex-column justify-center align-items-center w-100 err">
							<i @click="onShow" class="hover-dark text-muted material-icons-outlined">refresh</i>
							<br />
							<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
						</div>
					</div>
					<div class="d-flex justify-content-center w-100 py-4" v-else-if="connections.length < 1">
						<span class="font-16 text-superlight">{{ __.get("messages.following-not-found") }}</span>
					</div>
					<div class="connections-list" v-else>
						<div v-for="connection in connections" :key="'connections_' + connection.id" class="connection-item">
							<wire-link :href="'/' + connection.follower.slug" class="userinfo">
								<lazy-image class="mb-0 profile-standard" imgClass="profile-standard" :src="connection.follower.profile"></lazy-image>
								<div class="page-name d-flex flex-column">
									<div class="d-flex align-items-center">
										<user-badges class="me-1" :onlyOne="true" :badgeStatus="connection.follower.badge_status" />
										<strong> {{ connection.follower.name }} <i v-if="connection.follower.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
									</div>
									<span class="shortbio"> {{ connection.follower.short_bio }} </span>
								</div>
							</wire-link>
							<connetion-buttons :page="connection.follower" :blocked="connection.follower.blocked"></connetion-buttons>
						</div>
						<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMoreConnection"></infinite-loading>
					</div>
				</tab>
				<tab :name="__.get('user-profile.followings')" id="followings" :selected="current_tab == 'followings'">
					<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
					<div style="min-height: 200px" class="d-flex align-items-center justify-content-center loading" v-else-if="error">
						<div class="d-flex flex-column justify-center align-items-center w-100 err">
							<i @click="onShow" class="hover-dark text-muted material-icons-outlined">refresh</i>
							<br />
							<span class="text-muted">{{ __.get("messages.connection-error") }}</span>
						</div>
					</div>
					<div class="d-flex justify-content-center w-100 py-4" v-else-if="connections.length < 1">
						<span class="font-16 text-superlight">{{ __.get("messages.following-not-found") }}</span>
					</div>
					<div class="connections-list" v-else>
						<div class="connection-item clickable" @click="showTags = true">
							<div>
								<i class="material-icons me-3">tag</i>
								<strong class="font-16 text-dark font-demibold">{{ __.get("user-profile.tags") }}</strong>
							</div>

							<i class="material-icons text-gray hover-dark">chevron_right</i>
						</div>
						<div v-for="connection in connections" :key="'connections_' + connection.id" class="connection-item">
							<wire-link :href="'/' + connection.following.slug" class="userinfo">
								<lazy-image class="mb-0 profile-standard" imgClass="profile-standard" :src="connection.following.profile"></lazy-image>
								<div class="page-name d-flex flex-column">
									<div class="d-flex align-items-center">
										<user-badges class="me-1" :onlyOne="true" :badgeStatus="connection.following.badge_status" />
										<strong> {{ connection.following.name }} <i v-if="connection.following.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
									</div>
									<span class="shortbio"> {{ connection.following.short_bio }} </span>
								</div>
							</wire-link>
							<connetion-buttons :page="connection.following" :blocked="connection.following.blocked"></connetion-buttons>
						</div>
						<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMoreConnection"></infinite-loading>
					</div>
				</tab>
			</tabs>
		</b-modal>
	</div>
</template>

<script>
import MaterialTextField from "../inputs/MaterialTextField";
import AcceptConnection from "../buttons/AcceptConnection";
import PageInfoCard from "../Cards/PageInfoCard";

import ModalMixin from "../../Mixins/Modal";
import LoadingSpinner from "../LoadingSpinner.vue";
import FollowButton from "../buttons/FollowButton.vue";
import { mapState } from "vuex";
import PagesListLoading from "../Skeletons/PagesListLoading.vue";
import FollowedTagsModal from "./FollowedTagsModal.vue";
export default {
	mixins: [ModalMixin],
	name: "ConnetionsModal",
	watch: {
		search(value) {
			if (value.length > 0) {
				this.connections = [];
				this.searchLoading = true;
				axios
					.post(`/${this.page.slug}/${this.current_tab}`, { q: value })
					.then((response) => {
						this.connections = response.data.connections.data;
						this.next_page_url = response.data.connections.next_page_url;
					})
					.catch((err) => {
						console.log(err);
						this.toast(__.get("messages.error-in-get-data"));
					})
					.then(() => {
						this.searchLoading = false;
					});
			} else {
				this.onShow();
			}
		},
	},
	computed: {
		...mapState(["user"]),
		countConnections() {
			if (this.$store.state.user.id == this.page.user_id) {
				return `(${this.total})`;
			}
			return "";
		},
	},
	methods: {
		onShow() {
			this.loading = true;
			axios
				.post(`/${this.page.slug}/${this.current_tab}`)
				.then((response) => {
					this.connections = response.data.connections.data;
					this.next_page_url = response.data.connections.next_page_url;
				})
				.catch((err) => {
					console.log(err);
					this.error = true;
					this.toast(__.get("messages.error-in-get-data"));
				})
				.then(() => {
					this.loading = false;
				});
		},
		onAcceptConnection() {
			this.search = null;
		},
		tabSelect(tab) {
			if (tab !== this.current_tab) {
				this.connections = [];
				this.loading = true;
				this.error = false;
				this.current_tab = tab;
				axios
					.post(`/${this.page.slug}/${this.current_tab}`)
					.then((response) => {
						this.connections = response.data.connections.data;
						this.next_page_url = response.data.connections.next_page_url;
					})
					.catch((err) => {
						console.log(err);
						this.error = true;
						this.toast(__.get("messages.error-in-get-data"));
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
		loadMoreConnection($state) {
			axios
				.post(this.next_page_url)
				.then((response) => {
					const data = response.data.connections;
					if (data) {
						this.connections = this.connections.concat(data.data);
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
	},

	props: ["page"],
	data() {
		return {
			current_tab: "followers",
			total: 0,
			error: false,
			connections: [],
			search: "",
			loading: false,
			loadingMoreConnection: false,
			loadingMoreInvite: false,
			invites: [],
			invites_next_page: null,
			next_page_url: null,
			cancelToken: undefined,
			searchLoading: false,
			cancelSource: null,
			showTags: false,
		};
	},
	components: {
		AcceptConnection,
		MaterialTextField,
		PageInfoCard,
		LoadingSpinner,
		FollowButton,
		PagesListLoading,
		FollowedTagsModal,
	},
};
</script>

<style>
</style>
