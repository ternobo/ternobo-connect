<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer title="شبکه" size="md" :centered="true">
		<tabs @selected="tabSelect" tabsClass="connections-tab" :centered="false" :compact="true">
			<tab :name="`دنبال شده‌ها`" id="followings" :selected="true">
				<div class="connections-list">
					<div v-for="connections in connections" :key="'connections_' + connections.id" class="connection-item">
						<wire-link :href="'/' + connections.following.slug" class="userinfo">
							<lazy-image class="mb-0 profile-standard" imgClass="profile-standard" :src="connections.following.profile"></lazy-image>
							<div class="page-name d-flex flex-column">
								<strong> {{ connections.following.name }} <i v-if="connections.following.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
								<span class="shortbio"> {{ connections.following.short_bio }} </span>
							</div>
						</wire-link>
						<follow-button :page="connections.following.id"></follow-button>
					</div>
					<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
					<div class="d-flex justify-content-center w-100 py-4" v-if="loading">
						<loading-spinner></loading-spinner>
					</div>
					<div class="d-flex justify-content-center w-100 py-4" v-else-if="connections.length < 1">
						<span class="font-16 text-superlight">هیچ دنبال شده‌ای یافت نشد</span>
					</div>
				</div>
			</tab>
			<tab :name="`دنبال کننده‌ها`" id="followers">
				<div class="connections-list">
					<div v-for="connections in connections" :key="'connections_' + connections.id" class="connection-item">
						<wire-link :href="'/' + connections.follower.slug" class="userinfo">
							<lazy-image class="mb-0 profile-standard" imgClass="profile-standard" :src="connections.follower.profile"></lazy-image>
							<div class="page-name d-flex flex-column">
								<strong> {{ connections.follower.name }} <i v-if="connections.follower.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
								<span class="shortbio"> {{ connections.follower.short_bio }} </span>
							</div>
						</wire-link>
						<follow-button :page="connections.follower.id"></follow-button>
					</div>
					<infinite-loading v-if="this.next_page_url != null" spinner="spiral" @infinite="loadMore"></infinite-loading>
					<div class="d-flex justify-content-center w-100 py-4" v-if="loading">
						<loading-spinner></loading-spinner>
					</div>
					<div class="d-flex justify-content-center w-100 py-4" v-else-if="connections.length < 1">
						<span class="font-16 text-superlight">هیچ دنبال کننده‌ای یافت نشد</span>
					</div>
				</div>
			</tab>
			<template slot="custom-item">
				<div class="pt-2">
					<MaterialTextField v-model="search" class="d-flex align-items-center material--transparent material--xsm" input-class="pl-4" placeholder="جستجو نام">
						<div style="position: absolute; left: 4px">
							<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
							<i v-else class="material-icons">search</i>
						</div>
					</MaterialTextField>
				</div>
			</template>
		</tabs>
	</b-modal>
</template>

<script>
import MaterialTextField from "../inputs/MaterialTextField";
import AcceptConnection from "../buttons/AcceptConnection";
import PageInfoCard from "../Cards/PageInfoCard";

import ModalMixin from "../../Mixins/Modal";
import LoadingSpinner from "../LoadingSpinner.vue";
import FollowButton from "../buttons/FollowButton.vue";
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
						this.connections = response.data.connections.data;
					})
					.catch((err) => {
						console.log(err);
						this.toast("خطا در دریافت اطلاعات");
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
					console.log(response.data);

					this.connections = response.data.connections.data;
					this.connections = response.data.connections.data;
					this.next_page_url = response.data.connections.next_page_url;
				})
				.catch((err) => {
					console.log(err);
					this.toast("خطا در دریافت اطلاعات");
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
				this.current_tab = tab;
				axios
					.post(`/${this.page.slug}/${this.current_tab}`)
					.then((response) => {
						this.connections = response.data.connections.data;
						this.connections = response.data.connections.data;
					})
					.catch((err) => {
						console.log(err);
						this.toast("خطا در دریافت اطلاعات");
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
		loadMoreConnection() {
			if (this.next_page_url !== null && !this.loadingMoreConnection) {
				this.loadingMoreConnection = true;
				axios
					.post(this.next_page_url)
					.then((response) => {
						const data = response.connections;
						if (data) {
							this.connections = this.connections.concat(data.data);
							this.next_page_url = data.next_page_url;
						}
					})
					.catch((error) => {
						console.error(error);
					})
					.then(() => {
						this.loadingMoreConnection = false;
					});
			}
		},
	},

	props: ["page"],
	data() {
		return {
			current_tab: "followings",
			total: 0,
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
		};
	},
	components: {
		AcceptConnection,
		MaterialTextField,
		PageInfoCard,
		LoadingSpinner,
		FollowButton,
	},
};
</script>

<style>
</style>
