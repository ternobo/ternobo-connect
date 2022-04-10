<template>
	<b-modal v-model="showModal" hide-footer @show="loadFollowings" :title="__.get('user-profile.tags')" header-class="back-modal" size="md" :centered="true">
		<template #modal-header-close> arrow_back </template>
		<div class="input-group-icon mb-4">
			<input class="form-control fill rounded xsm-input" v-model="search" :placeholder="__.get('application.search')" />
			<i class="material-icons-outlined">search</i>
		</div>
		<div class="connections-tab">
			<pages-list-loading style="min-height: 200px" v-if="loading"></pages-list-loading>
			<error-reload v-else-if="error" @reload="loadFollowings"></error-reload>
			<div class="d-flex justify-content-center w-100 py-4" v-else-if="connections.length < 1">
				<span class="font-16 text-superlight">{{ __.get("messages.following-not-found") }}</span>
			</div>
			<connections-list v-else :connections="connections" :next_page_url="next_page_url" @loadMore="loadMoreConnection">
				<template v-slot:default="{ connection }">
					<wire-link :href="`/tags/${connection.following.tag}`" class="d-flex align-items-center">
						<strong class="font-16" :class="{ communityTag: connection.following.is_community }">
							{{ connection.following.is_community ? connection.following.tag : connection.following.name }}
						</strong>
						<img width="24" :src="assetURL(connection.following.icon)" v-if="connection.following.is_community" class="ms-2" />
					</wire-link>
					<follow-tag-button v-if="user != null" :tag="connection.following.tag" :followed="connection.following.is_followed"></follow-tag-button>
				</template>
			</connections-list>
		</div>
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
import ModalMixin from "../../Mixins/Modal";
import FollowTagButton from "../buttons/FollowTagButton.vue";
import ConnectionsList from "../Common/Connections/ConnectionsList.vue";
import ErrorReload from "../Common/ErrorReload.vue";
import PagesListLoading from "../Skeletons/PagesListLoading.vue";
export default {
	components: { ErrorReload, ConnectionsList, PagesListLoading, FollowTagButton },
	mixins: [ModalMixin],
	props: ["page"],
	data() {
		return {
			loading: false,
			error: false,
			connections: [],
			next_page_url: null,
			search: "",

			searchTimeout: null,
		};
	},
	watch: {
		search(value) {
			clearTimeout(this.searchTimeout);
			if (value.length > 0) {
				this.searchTimeout = setTimeout(() => {
					this.connections = [];
					this.loading = true;
					axios
						.post(`/${this.page.slug}/followings/tags`, { q: value })
						.then((response) => {
							if (response.data.result) {
								this.connections = response.data.connections.data;
								this.next_page_url = response.data.connections.next_page_url;
							} else {
								this.error = true;
							}
						})
						.catch((err) => {
							console.error(err);
							this.error = true;
						})
						.then(() => {
							this.loading = false;
						});
				}, 500);
			} else {
				this.loadFollowings();
			}
		},
	},
	computed: {
		...mapState(["user"]),
	},
	methods: {
		loadFollowings() {
			this.error = false;
			this.loading = true;

			axios
				.post(`/${this.page.slug}/followings/tags`)
				.then((response) => {
					if (response.data.result) {
						this.connections = response.data.connections.data;
						this.next_page_url = response.data.connections.next_page_url;
					} else {
						this.error = true;
					}
				})
				.catch((error) => {
					console.error(error);
					this.error = true;
				})
				.then(() => (this.loading = false));
		},
		loadMoreConnection($state) {
			axios
				.post(this.next_page_url, { q: this.search })
				.then((response) => {
					if (response.data.result) {
						this.connections = this.connections.concat(response.data.connections.data);
						this.next_page_url = response.data.connections.next_page_url;
						$state.loaded();
					} else {
						this.error = true;
						$state.error();
					}
				})
				.catch((err) => {
					$state.error();
					console.error(err);
				});
		},
	},
};
</script>

<style>
</style>