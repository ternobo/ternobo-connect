<template>
	<div class="chat-widget-container" v-if="$store.state.user != null">
		<chats-widget @selectChat="onChatSelect" />
		<conversation-widget v-for="(chat, index) in chats" :ref="'chatItem'" :key="'chat_widget_id_' + chat.id" :chat="chat" @close="chats.splice(index, 1)" />
	</div>
</template>

<script>
import ChatsWidget from "./ChatsWidget.vue";
import ConversationWidget from "./ConversationWidget.vue";
export default {
	data() {
		return {
			chats: [],
		};
	},
	methods: {
		onChatSelect(chat) {
			for (var i = 0; i < this.chats.length; i++) {
				if (this.chats[i].id == chat.id) {
					this.$refs["chatItem"][i].showList = true;
					return;
				}
			}
			let maxChat = Number.parseInt((window.innerWidth - 40) / 376);
			if (this.chats.length == maxChat) {
				this.chats.splice(0, 1);
			}
			this.chats.push(chat);
		},
	},
	components: { ChatsWidget, ConversationWidget },
};
</script>

<style>
</style>
