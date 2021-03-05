<template>
	<div class="message-column" :class="{ received: message.sender.id != $store.state.user.id }">
		<div class="message-container" :class="{ 'send-error': error }">
			<i class="material-icons reload-btn" v-if="error" @click="sendMessage" :class="{ rotateAnimation: loading }">refresh</i>
			<lazy-image class="profile-xsm" img-class="profile-xsm" :class="{ 'opacity-0': hideProfile }" :src="message.sender.profile"></lazy-image>
			<div>
				<div v-if="message.type == 'text'" class="text-message-head">
					<strong>{{ message.sender.name }}</strong>
					<loading-spinner class="message-loading" v-if="loading"></loading-spinner>
					<i class="material-icons text-danger" v-else-if="error">error_outline</i>
					<small v-else class="message-time">{{ sendTime }}</small>
				</div>
				<component v-bind="$props" :is="type"></component>
			</div>
			<div v-if="message.type != 'text'">
				<loading-spinner class="message-loading" v-if="loading"></loading-spinner>
				<i class="material-icons text-danger" v-else-if="error">error_outline</i>
				<small v-else class="message-time">{{ sendTime }}</small>
			</div>
		</div>
	</div>
</template>

<script>
import LoadingSpinner from "../../LoadingSpinner.vue";
export default {
	components: { LoadingSpinner },
	computed: {
		sendTime() {
			return moment.from(this.message.created_at).format("HH:mm");
		},
	},
	methods: {
		sendMessage() {
			this.loading = true;
			this.$store.commit("setChatLastMessage", { id: this.message.conversation_id, message: this.message });
			this.$store.dispatch("sortChats");

			let formData = new FormData();
			if (this.message.conversation_id) {
				formData.append("conversation_id", this.message.conversation_id);
			} else {
				formData.append("user_id", this.message.sendTo);
			}
			if (this.message.text) {
				formData.append("text", this.message.text);
			}
			switch (this.message.type) {
				case "text":
					formData.append("type", "text");
					break;
				case "video":
					formData.append("media", this.message.media[0]);
					formData.append("type", "video");
					break;
				case "image":
					formData.append("media", this.message.media[0]);
					formData.append("type", "image");
					break;
				case "audio":
					formData.append("media", this.message.media[0]);
					formData.append("type", "audio");
					break;
				case "voice":
					formData.append("voice", this.message.media[0]);
					formData.append("type", "voice");
					break;
				case "document":
					formData.append("media", this.message.media[0]);
					formData.append("type", "document");
					break;
				case "meta":
					formData.append("contact_id", this.message.contact.user.id);
					formData.append("type", "contact");
					break;
			}
			axios
				.post("/chats/send-message", formData)
				.then((response) => {
					this.$emit("update:message", response.data.message);
					this.$store.dispatch("loadChats");
				})
				.catch((error) => {
					this.error = true;
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
	data() {
		return {
			type: () => import("./TextMessage"),
			error: false,
			loading: false,
		};
	},
	created() {
		if (this.message.shouldSend) {
			this.sendMessage();
		}
		switch (this.message.type) {
			case "text":
				this.type = () => import("./TextMessage");
				break;
			case "video":
				this.type = () => import("./MediaMessage");
				break;
			case "image":
				this.type = () => import("./MediaMessage");
				break;
			case "audio":
				this.type = () => import("./VoiceMessage");
				break;
			case "voice":
				this.type = () => import("./VoiceMessage");
				break;
			case "document":
				this.type = () => import("./DocuementMessage");
				break;
			case "meta":
				this.type = () => import("./ContactShareMessage");
				break;
		}
	},
	props: ["message", "hideProfile"],
};
</script>
