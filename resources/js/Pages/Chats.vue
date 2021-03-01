<template>
	<div class="chat-container">
		<div class="chats-list">
			<div class="chat-list-header">
				<MaterialTextField v-model="searchInput" class="d-flex align-items-center material--transparent material--sm" input-class="w-100 pl-4" input-placeholder="جستجو">
					<div style="position: absolute; left: 0">
						<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
						<i v-else-if="searchInput != null" @click="searchInput = null" class="material-icons text-superlight clickable hover-dark">close</i>
						<i v-else class="material-icons text-superlight">search</i>
					</div>
				</MaterialTextField>
			</div>
			<div class="chats" v-if="loading">
				<chat-skeleton v-for="x in 10" :key="x"></chat-skeleton>
			</div>
			<div class="chats" v-else ref="chatsElem">
				<chat-item v-for="(chat, index) in chats" :key="'chat_id_' + chat.id" @click.native="selectChat(chat)" :selected="selectedChat != null && chat.id == selectedChat.id" :chat.sync="chats[index]"></chat-item>
				<div class="d-flex justify-content-center w-100" v-if="chats_next_page_url != null" v-reached="loadMoreChats">
					<loading-spinner></loading-spinner>
				</div>
			</div>
		</div>
		<conversation v-if="selectedChat != null" ref="conversationElem" :chat-id="selectedChat.id" :profile="selectedChat.user ? selectedChat.user.username : null" :title="chatTitle(selectedChat)" :subtitle="chatSubtitle(selectedChat)"></conversation>
		<div v-else class="conversation-container">
			<no-chat-selected></no-chat-selected>
		</div>
	</div>
</template>

<script>
import ChatItem from "../Components/Chat/ChatItem.vue";
import Conversation from "../Components/Chat/Conversation.vue";
import NoChatSelected from "../Components/Chat/NoChatSelected.vue";
import LazyImage from "../Components/LazyImage.vue";
import ChatSkeleton from "../Components/Skeletons/ChatSkeleton.vue";
import AppLayout from "../Layouts/AppLayout";
import { mapState, mapActions } from "vuex";

export default {
	computed: {
		...mapState(["chats", "chats_next_page_url"]),
	},
	methods: {
		chatElem() {
			return this.$refs["chatsElem"];
		},
		loadMoreChats() {
			this.$store.dispatch("loadChatsNextPage").then(() => {
				this.loadingNextChats = false;
			});
		},
		onNewMessage(event) {
			let message = event.detail.message;
			if (this.selectedChat != null && message.conversation_id == this.selectedChat.id) {
				this.$refs.conversationElem.addMessage(message);
			} else {
				this.loadChats(true);
			}
		},
		loadChats(repeat = false) {
			this.$store
				.dispatch("loadChats")
				.catch((err) => {
					if (repeat) {
						this.loadChats(true);
					} else {
						this.error = true;
					}
				})
				.then(() => {
					this.loading = false;
				});
		},
		selectChat(chat) {
			this.selectedChat = chat;
		},
		chatSubtitle(chat) {
			return chat.type == "private" ? chat.user.short_bio : "";
		},
		chatTitle(chat) {
			return chat.type == "private" ? chat.user.first_name + " " + chat.user.last_name : chat.title;
		},
	},
	watch: {
		isTyping(newVal) {},
		searchInput() {
			// clear timeout variable
			clearTimeout(this.searchTimeout);
			this.searchTimeout = setTimeout(() => {
				if (this.searchInput != null && this.searchInput.length > 0) {
					this.searchLoading = true;
					axios
						.post("/chats/search", { q: this.searchInput })
						.then((response) => {
							let data = response.data;
							this.$store.commit("setChats", data.conversations.data);
						})
						.catch((err) => {
							console.log(err);
						})
						.then(() => {
							this.searchLoading = false;
						});
				} else {
					this.loadChats();
				}
			}, 1000);
		},
	},
	data() {
		return {
			searchTimeout: null,

			loadingNextChats: false,

			loading: false,
			searchInput: null,
			searchLoading: false,

			selectedChat: null,

			searchCancelToken: null,
			searchCancelSource: null,

			onEsc: (e) => {
				if (e.key === "Escape") {
					this.selectedChat = null;
				}
			},
		};
	},
	mounted() {
		this.loading = true;
		this.loadChats(true);
		document.addEventListener("message:new", this.onNewMessage);
		window.addEventListener("keydown", this.onEsc);
		this.searchCancelToken = axios.CancelToken;
		this.searchCancelSource = this.searchCancelToken.source();
	},
	destroyed() {
		window.removeEventListener("keydown", this.onEsc);
		window.removeEventListener("message:new", this.onNewMessage);
	},
	components: { LazyImage, ChatItem, Conversation, NoChatSelected, ChatSkeleton },
	layout: AppLayout,
};
</script>

