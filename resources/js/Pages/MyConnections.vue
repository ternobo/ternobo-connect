<template>
	<base-layout>
		<div class="invitations" v-if="invites.length > 0">
			<span class="text-dark font-18" style="border-bottom: 1px solid #191919"> دعوت‌ها </span>
			<div class="list py-4">
				<div class="row">
					<div class="col-md-6 mb-3" v-for="invite in invites" :key="invite.id">
						<ConnectInvitation @accpeted="onAcceptConnection" :user="invite.connection" :connection-id="invite.id"></ConnectInvitation>
					</div>
					<div class="w-100 d-flex align-items-center justify-content-center p-4" v-if="invites_next_page !== null && !loadingMoreInvite">
						<button style="background: #e0e0e0; border: none" class="btn btn-grey-10" @click="loadMoreInvtite">نمایش بیشتر</button>
					</div>
					<div class="d-flex align-items-center justify-content-center p-4" v-if="loadingMoreInvite">
						<loading-spinner></loading-spinner>
					</div>
				</div>
			</div>
		</div>
		<div class="connections" v-infinite-scroll="loadMoreConnection" :infinite-scroll-disabled="loadingMoreConnection" infinite-scroll-distance="5">
			<tabs :compact="true" :centered="true" @selected="tabSelect">
				<tab name="شبکه من" id="connections" :selected="true">
					<div class="w-100 d-flex justify-content-between">
						<strong> شبکه من ({{ total }}) </strong>
						<div class="search">
							<MaterialTextField v-model="search" class="d-flex align-items-center material--transparent material--sm" input-class="pl-4" placeholder="جستجو نام">
								<div style="position: absolute; left: 0">
									<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
									<i v-else class="material-icons">search</i>
								</div>
							</MaterialTextField>
						</div>
					</div>

					<div class="row pt-4" v-if="!loading && current_tab === 'connections'">
						<div class="col-lg-3" :class="{ 'mb-3': !$root.isDesktop }" v-for="connection in list" :key="connection.id">
							<PageInfoCard :page="connection.user.personal_page"></PageInfoCard>
						</div>
						<div class="p-4 text-center" v-if="list.length < 1">
							<span class="font-20 text-muted">هیچ ارتباطی یافت نشد</span>
						</div>
					</div>
					<div class="d-flex align-items-center justify-content-center p-4" v-if="loading || loadingMoreConnection">
						<loading-spinner></loading-spinner>
					</div>
				</tab>
				<tab name="دنبال شده‌ها" id="followings">
					<div class="w-100 d-flex justify-content-between">
						<strong> دنبال شده‌ها ({{ total }}) </strong>
						<div class="search">
							<MaterialTextField v-model="search" class="d-flex align-items-center material--transparent material--sm" input-class="pl-4" placeholder="جستجو نام">
								<div style="position: absolute; left: 0">
									<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
									<i v-else class="material-icons">search</i>
								</div>
							</MaterialTextField>
						</div>
					</div>

					<div class="row pt-4" v-if="!loading && current_tab === 'followings'">
						<div class="col-lg-3 mb-3" v-for="connection in list" :key="connection.id">
							<PageInfoCard :page="connection.page"></PageInfoCard>
						</div>
						<div class="p-4 text-center" v-if="list.length < 1">
							<span class="font-20 text-muted">هیچ دنبال شده‌ای یافت نشد</span>
						</div>
					</div>
					<div class="d-flex align-items-center justify-content-center p-4" v-if="loading || loadingMoreConnection">
						<loading-spinner></loading-spinner>
					</div>
				</tab>
				<tab name="دنبال کننده‌ها" id="followers">
					<div class="w-100 d-flex justify-content-between">
						<strong> دنبال کننده‌ها ({{ total }}) </strong>
						<div class="search">
							<MaterialTextField v-model="search" class="d-flex align-items-center material--transparent material--sm" input-class="pl-4" placeholder="جستجو نام">
								<div style="position: absolute; left: 1px">
									<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
									<i v-else class="material-icons">search</i>
								</div>
							</MaterialTextField>
						</div>
					</div>

					<div class="row pt-4" v-if="!loading && current_tab === 'followers'">
						<div class="col-lg-3 mb-3" v-for="connection in list" :key="connection.id">
							<PageInfoCard :page="connection.page"></PageInfoCard>
						</div>
						<div class="p-4 text-center" v-if="list.length < 1">
							<span class="font-20 text-muted">هیچ دنبال کننده‌ای یافت نشد</span>
						</div>
					</div>
					<div class="d-flex align-items-center justify-content-center p-4" v-if="loading || loadingMoreConnection">
						<loading-spinner></loading-spinner>
					</div>
				</tab>
			</tabs>
		</div>
	</base-layout>
</template>

<script>
import MaterialTextField from "../Components/inputs/MaterialTextField";
import AppLayout from "../Layouts/AppLayout";
import ConnectionButton from "../Components/buttons/ConnectionButton";
import FollowButton from "../Components/buttons/FollowButton";
import AcceptConnection from "../Components/buttons/AcceptConnection";
import PageInfoCard from "../Components/Cards/PageInfoCard";
import ConnectInvitation from "../Components/Cards/ConnectInvitation";

export default {
	watch: {
		search(value) {
			this.searchLoading = true;
			this.$store.state.ternoboWireApp
				.getData(this.current_tab + "?q=" + value, false)
				.then((response) => {
					let data = response.connections;
					this.list = data.data;
					this.total = data.total;
					this.connections_next_page = data.next_page_url;
				})
				.catch((error) => {
					console.log(error);
				})
				.then(() => {
					this.searchLoading = false;
				});
		},
	},
	methods: {
		onAcceptConnection() {
			this.search = null;
		},
		tabSelect(tab) {
			if (tab !== this.current_tab) {
				this.current_tab = tab;

				this.loading = true;
				this.$store.state.ternoboWireApp
					.getData(tab, false)
					.then((response) => {
						const data = response.connections;
						if (data) {
							this.list = data.data;
							this.total = data.total;
							this.connections_next_page = data.next_page_url;
						}
					})
					.catch((error) => {
						console.error(error);
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
		loadMoreConnection() {
			if (this.connections_next_page !== null && !this.loadingMoreConnection) {
				this.loadingMoreConnection = true;
				this.$store.state.ternoboWireApp
					.getData(this.connections_next_page, false)
					.then((response) => {
						const data = response.connections;
						if (data) {
							this.list = this.list.concat(data.data);
							this.connections_next_page = data.next_page_url;
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
		loadMoreInvtite() {
			if (this.invites_next_page !== null && !this.loadingMoreInvite) {
				this.loadingMoreInvite = true;
				this.$store.state.ternoboWireApp
					.getData(this.invites_next_page, false)
					.then((response) => {
						const data = response.pending_connections;
						if (data) {
							this.invites = this.invites.concat(data.data);
							this.invites_next_page = data.next_page_url;
						}
					})
					.catch((err) => {
						console.error(err);
					})
					.then(() => {
						this.loadingMoreInvite = false;
					});
			}
		},
	},
	created() {
		this.cancelSource = axios.CancelToken.source();
		this.list = this.connections.data;
		this.connections_next_page = this.connections.next_page_url;
		this.invites = this.pending_connections.data;
		this.invites_next_page = this.pending_connections.next_page_url;
		this.total = this.connections.total;
	},
	props: {
		pending_connections: {
			type: Object,
			default: undefined,
		},
		connections: {
			type: Object,
			default: undefined,
		},
	},
	name: "MyConnectons",
	data() {
		return {
			current_tab: "connections",
			total: 0,
			list: [],
			search: "",
			loading: false,
			loadingMoreConnection: false,
			loadingMoreInvite: false,
			invites: [],
			invites_next_page: null,
			connections_next_page: null,
			cancelToken: undefined,
			searchLoading: false,
			cancelSource: null,
		};
	},
	components: {
		ConnectionButton,
		AcceptConnection,
		FollowButton,
		MaterialTextField,
		PageInfoCard,
		ConnectInvitation,
	},
	layout: AppLayout,
};
</script>
