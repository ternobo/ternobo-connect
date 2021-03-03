<template>
	<div class="chat-item" :class="{ active: selected }">
		<div class="chat-info">
			<lazy-image :src="chat ? chat.user.profile : user.profile" class="profile-image"></lazy-image>
			<div class="d-flex flex-column">
				<span class="profile-name"> {{ chatTitle }} </span>
				<span class="last-message" v-html="lastPreview"></span>
			</div>
		</div>
		<div class="d-flex flex-column align-items-end" v-if="chat">
			<span class="update-time"> {{ updated_at }} </span>
			<span class="unread-badge" v-if="chat.unread_messages_count > 0">{{ chat.unread_messages_count }}</span>
		</div>
	</div>
</template>

<script>
import LazyImage from "../LazyImage.vue";
export default {
	data() {
		return {
			updated_at: null,
		};
	},
	watch: {
		selected(newVal) {
			if (newVal) {
				let chat = this.chat;
				chat.unread_messages_count = 0;
				this.updated_at = this.time(this.chat.last_message.created_at);
				this.$emit("chat:update", chat);
			}
		},
		chat: {
			deep: true,

			handler() {
				this.updated_at = this.time(this.chat.last_message.created_at);
			},
		},
	},
	mounted() {
		this.updated_at = this.time(this.chat.last_message.created_at);
	},
	computed: {
		lastPreview() {
			let preview = null;
			if (this.chat) {
				switch (this.chat.last_message.type) {
					case "text":
						preview = this.chat.last_message.text.substr(0, 15);
						break;
					case "voice":
						preview = "<i class='material-icons font-18'>mic</i> پیام صوتی";
						break;
					case "audio":
						preview = "<i class='material-icons font-18'>library_music</i> رسانه صوتی";
						break;
					case "document":
						preview = "<i class='material-icons font-18'>file_present</i> پرونده";
						break;
					case "video":
						preview = "<i class='material-icons font-18'>video_library</i> ویدیو";
						break;
					case "image":
						preview = "<i class='material-icons font-18'>image</i> تصویر";
						break;
				}
			}
			return preview;
		},
		chatTitle() {
			if (this.chat) {
				return this.chat.type == "private" ? this.chat.user.first_name + " " + this.chat.user.last_name : this.chat.title;
			} else if (this.user) {
				return this.user.first_name + " " + this.user.last_name;
			}
		},
	},
	props: ["chat", "user", "selected"],
	components: {
		LazyImage,
	},
};
</script>
