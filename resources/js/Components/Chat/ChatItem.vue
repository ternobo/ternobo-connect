<template>
	<div class="chat-item" :class="{ active: selected }" @click="createChat">
		<div class="chat-info">
			<lazy-image :loadingColor="skeletonOptions.profileColor" :src="chat ? chat.user.profile : user.profile" class="profile-image"></lazy-image>
			<div class="d-flex flex-column">
				<span class="profile-name"> {{ chatTitle }}<i class="verificationcheck" style="margin-right: 2px" v-if="chat ? chat.user.is_verified : user.is_verified">check_circle</i> <i class="material-icons-outlined text-superlight font-16 font-light" v-if="chat ? chat.muted : false">volume_off</i></span>
				<span class="last-message" v-if="chat" v-html="lastPreview"></span>
				<div v-else class="d-flex">
					<span class="last-message ml-2">{{ user.short_bio }}</span>
					<loading-spinner v-if="loading" style="height: 16px; width: 16px"></loading-spinner>
				</div>
			</div>
		</div>
		<div class="d-flex flex-column align-items-end" v-if="chat">
			<span class="update-time"> {{ updated_at }} </span>
			<span class="unread-badge" :class="{ muted: chat ? chat.muted : false }" v-if="chat.unread_messages_count > 0 && !selected">{{ chat.unread_messages_count }}</span>
		</div>
	</div>
</template>

<script>
import LazyImage from "../LazyImage.vue";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
	methods: {
		createChat() {
			if (this.user && this.newConversation) {
				this.loading = true;
				axios
					.post("/chats/conversations/create/" + this.user.id)
					.then((response) => {
						this.$emit("newConversation", response.data.conversation);
					})
					.catch((err) => {
						console.log(err);
					})
					.then(() => {
						this.loading = false;
					});
			}
		},
	},
	data() {
		return {
			updated_at: null,
			loading: false,
			user: {},
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
	created() {
		if (this.connection) {
			this.user = this.connection.user;
		}
	},
	mounted() {
		if (this.chat) {
			this.updated_at = this.time(this.chat.last_message.created_at);
		}
	},
	computed: {
		lastPreview() {
			let preview = null;
			if (this.chat) {
				switch (this.chat.last_message.type) {
					case "text":
						preview = this.chat.last_message.text.substr(0, 22);
						if (this.chat.last_message.text.length > 22) {
							preview = preview + "...";
						}
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
					case "meta":
						preview = "<i class='material-icons font-18'>person</i> کاربر";
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
	props: {
		chat: {},
		connection: {},
		selected: {},
		newConversation: {
			type: Boolean,
			default: true,
			required: false,
		},
	},

	components: {
		LazyImage,
		LoadingSpinner,
	},
};
</script>
