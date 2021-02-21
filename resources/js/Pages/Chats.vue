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
			<div class="chats">
				<chat-item v-for="(chat, index) in chats" :key="'chat_id_' + chat.id" @click.native="selectChat(chat)" :selected="selectedChat != null && chat.id == selectedChat.id" :chat.sync="chats[index]"></chat-item>
			</div>
		</div>
		<conversation v-if="selectedChat != null" :chat-id="selectedChat.id" :profile="selectedChat.user ? selectedChat.user.username : null" :title="chatTitle(selectedChat)" :subtitle="chatSubtitle(selectedChat)"></conversation>
		<div v-else class="conversation-container">
			<no-chat-selected></no-chat-selected>
		</div>
	</div>
</template>

<script>
import Input from "../../../vendor/laravel/jetstream/stubs/inertia/resources/js/Jetstream/Input.vue";
import ChatItem from "../Components/Chat/ChatItem.vue";
import Conversation from "../Components/Chat/Conversation.vue";
import NoChatSelected from "../Components/Chat/NoChatSelected.vue";
import LazyImage from "../Components/LazyImage.vue";
import AppLayout from "../Layouts/AppLayout";
export default {
	methods: {
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
			searchInput: null,
			searchLoading: false,

			selectedChat: null,
			chats: {},

			onEsc: (e) => {
				if (e.key === "Escape") {
					this.selectedChat = null;
				}
			},
		};
	},
	mounted() {
		this.chats = this.chatsData.data;
		window.addEventListener("keydown", this.onEsc);
	},
	destroyed() {
		window.removeEventListener("keydown", this.onEsc);
	},
	components: { LazyImage, ChatItem, Input, Conversation, NoChatSelected },
	layout: AppLayout,
	props: ["chatsData"],
};
</script>

<style>
</style>
