<template>
	<div class="chat-item" :class="{ active: selected }">
		<div class="chat-info">
			<lazy-image src="/images/man-profile.png" class="profile-image"></lazy-image>
			<div class="d-flex flex-column">
				<span class="profile-name"> {{ chatTitle }} </span>
				<span class="last-message" v-html="lastPreview"></span>
			</div>
		</div>
		<div class="d-flex flex-column align-items-end">
			<span class="update-time"> {{ updated_at }} </span>
			<span class="unread-badge" v-if="chat.unread_messages_count > 0">{{ chat.unread_messages_count }}</span>
		</div>
	</div>
</template>

<script>
import LazyImage from "../LazyImage.vue";
export default {
	watch: {
		selected(newVal) {
			if (newVal) {
				let chat = this.chat;
				chat.unread_messages_count = 0;
				this.$emit("chat:update", chat);
			}
		},
	},
	computed: {
		lastPreview() {
			let preview = null;
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
			return preview;
		},
		updated_at() {
			return this.time(this.chat.updated_at);
		},
		chatTitle() {
			return this.chat.type == "private" ? this.chat.user.first_name + " " + this.chat.user.last_name : this.chat.title;
		},
	},
	props: ["chat", "selected"],
	components: {
		LazyImage,
	},
};
</script>
