<template>
	<div class="chat-container">
		<div class="chats-list">
			<div class="chat-list-header">
				<MaterialTextField v-model="searchInput" class="d-flex align-items-center material--transparent material--sm" input-class="w-100 pl-4" placeholder="جستجو">
					<div style="position: absolute; left: 0">
						<loading-spinner style="width: 20px; height: 20px" v-if="searchLoading"></loading-spinner>
						<i v-else class="material-icons text-superlight">search</i>
					</div>
				</MaterialTextField>
			</div>
			<div class="chats" v-if="loading">
				<chat-skeleton v-for="x in 8" :key="x"></chat-skeleton>
			</div>
			<div class="chats" v-else>
				<chat-item v-for="(chat, index) in chats" :key="'chat_id_' + chat.id" @click.native="selectChat(chat)" :selected="selectedChat != null && chat.id == selectedChat.id" :chat.sync="chats[index]"></chat-item>
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
export default {
	methods: {
		onNewMessage(event) {
			let message = event.detail.message;
			if (this.selectedChat != null && message.conversation_id == this.selectedChat.id) {
				this.$refs.conversationElem.addMessage(message);
			} else {
				this.loadChats(true);
			}
		},
		loadChats(repeat = false) {
			axios
				.post("/chats")
				.then((response) => {
					let chats = response.data.chats;
					this.chats = chats.data;
					this.next_page_url = chats.next_page_url;
				})
				.catch((err) => {
					if (repeat) {
						this.loadChats(true);
					} else {
						this.error = true;
					}
				})
				.then(() => {
					if (!repeat) {
						this.loading = false;
					}
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
		searchInput(newVal) {},
	},
	data() {
		return {
			loading: false,
			searchInput: null,
			searchLoading: false,

			selectedChat: null,
			chats: [],
			next_page_url: null,

			onEsc: (e) => {
				if (e.key === "Escape") {
					this.selectedChat = null;
				}
			},
		};
	},
	mounted() {
		this.loading = true;
		axios
			.post("/chats")
			.then((response) => {
				let chats = response.data.chats;
				this.chats = chats.data;
				this.next_page_url = chats.next_page_url;
			})
			.catch((err) => {
				this.error = true;
			})
			.then(() => {
				this.loading = false;
			});

		document.addEventListener("message:new", this.onNewMessage);
		window.addEventListener("keydown", this.onEsc);
	},
	destroyed() {
		window.removeEventListener("keydown", this.onEsc);
		window.removeEventListener("message:new", this.onNewMessage);
	},
	components: { LazyImage, ChatItem, Conversation, NoChatSelected, ChatSkeleton },
	layout: AppLayout,
};
</script>

