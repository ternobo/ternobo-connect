<template>
	<div class="chat-container">
		<div class="chats-list">
			<div class="chat-list-header">
				<MaterialTextField v-model="searchInput" class="d-flex align-items-center material--transparent material--sm" input-class="w-100 pl-4" input-placeholder="جستجو در گفتگوها">
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

				<div class="connections d-flex flex-column" v-if="connections.length > 0">
					<div class="search-part">شبکه من</div>
					<chat-item v-for="(connection, index) in connections" :key="'connections_id_' + connection.id" @newConversation="selectChat" :connection.sync="connections[index]"></chat-item>
					<div class="d-flex justify-content-center w-100" v-if="connections_next_page != null" v-reached="loadMoreConnections">
						<loading-spinner></loading-spinner>
					</div>
				</div>
			</div>
		</div>
		<conversation v-if="selectedChat != null" ref="conversationElem" :isVerified="selectedChat.user ? selectedChat.user.is_verified : false" :image="selectedChat.user ? selectedChat.user.profile : selectChat.icon" :chat-id="selectedChat.id" :profile="selectedChat.user ? selectedChat.user.username : null" :title="chatTitle(selectedChat)" :subtitle="chatSubtitle(selectedChat)"></conversation>
		<div v-else class="conversation-container">
			<no-chat-selected></no-chat-selected>
		</div>
	</div>
</template>

<script>
import AppLayout from "../Layouts/AppLayout.vue";
import ChatMixin from "../Mixins/ChatMixin";
export default {
	mixins: [ChatMixin],
	layout: AppLayout,
};
</script>

