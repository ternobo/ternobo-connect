<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer size="md" body-class="position-relative" title="یک کاربر را انتخاب کنید" :centered="true">
		<div class="search-user">
			<div class="search-input-rounded">
				<input class="form-control" v-model="search" placeholder="جستجو" />
				<div class="actions">
					<i class="material-icons" v-if="search == null || this.search.length < 1">search</i>
					<i class="material-icons" v-else-if="!loading" @click="search == null">close</i>
					<loading-spinner v-else style="height: 24px; width: 24px"></loading-spinner>
				</div>
			</div>
		</div>
		<div v-if="loadingUsers">
			<chat-skeleton class="bg-white px-0" v-for="x in 4" :key="x"></chat-skeleton>
		</div>
		<div class="connections-list" v-else>
			<chat-item v-for="(connection, index) in connections" :newConversation="false" :key="'connections_id_' + connection.id" @click.native="shareUser(connection)" :connection.sync="connections[index]"></chat-item>
			<div class="d-flex justify-content-center w-100" v-if="next_page_url != null" v-reached="loadMore">
				<loading-spinner></loading-spinner>
			</div>
		</div>

		<div class="d-flex align-items-center justify-content-center" style="height: 100%; width: 100%; position: absolute; left: 0px; background: rgb(255 255 255 / 60%); top: 0px" v-if="sendLoading">
			<loading-spinner></loading-spinner>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import LoadingSpinner from "../LoadingSpinner.vue";
import ChatSkeleton from "../Skeletons/ChatSkeleton.vue";
import ChatItem from "./ChatItem.vue";
export default {
	components: { LoadingSpinner, ChatSkeleton, ChatItem },
	watch: {
		search() {
			clearTimeout(this.searchTimeout);
			if (this.search != null && this.search.length > 0) {
				this.searchTimeout = setTimeout(() => {
					this.loading = true;
					axios
						.post("/connections", { q: this.search })
						.then((response) => {
							this.connections = response.data.connections.data;
							this.next_page_url = response.data.connections.next_page_url;
						})
						.catch((err) => {
							console.log(err);
							this.onShow();
						})
						.then(() => {
							this.loading = false;
						});
				}, 1000);
			} else {
				this.onShow();
			}
		},
	},
	data() {
		return {
			search: null,
			loading: false,
			loadingUsers: true,

			connections: [],
			next_page_url: null,
			loadingNextPage: false,

			searchTimeout: null,

			sendLoading: false,
		};
	},
	methods: {
		onShow() {
			this.loadingUsers = true;
			axios
				.post("/connections", { q: this.search })
				.then((response) => {
					this.connections = response.data.connections.data;
					this.next_page_url = response.data.connections.next_page_url;
				})
				.catch((err) => {
					console.log(err);
					this.onShow();
				})
				.then(() => {
					this.loadingUsers = false;
				});
		},
		loadMore() {
			axios
				.post(this.next_page_url, { q: this.search })
				.then((response) => {
					this.connections = this.connections.concat(response.data.connections.data);
					this.next_page_url = response.data.connections.next_page_url;
				})
				.catch((err) => {
					console.log(err);
				})
				.then(() => {
					this.loadingNextPage = false;
				});
		},
		onError() {
			this.toast("خطا در ارسال اطلاعات");
		},
		shareUser(connection) {
			let user_id = this.checkUser(connection.user_id) ? connection.connection_id : connection.user_id;
			let contact_id = this.user.id;
			this.sendLoading = true;
			axios
				.post("/chats/conversations/create/" + user_id)
				.then((response) => {
					let conversation = response.data.conversation;
					let formData = new FormData();
					formData.append("conversation_id", conversation.id);
					formData.append("contact_id", contact_id);
					formData.append("type", "contact");

					axios
						.post("/chats/send-message", formData)
						.then((response) => {
							this.$store.dispatch("loadChats");
							this.$emit("update:show", false);
						})
						.catch((err) => {
							console.log(err);
							this.onError();
						})
						.then(() => {
							this.sendLoading = false;
						});
				})
				.catch((err) => {
					console.log(err);
					this.onError();
					this.sendLoading = false;
				});
		},
	},

	props: ["user"],
	mixins: [ModalMixin],
	name: "UserShareModal",
};
</script>

<style>
</style>
