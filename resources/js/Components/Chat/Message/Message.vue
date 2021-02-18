<template>
	<div>
		<div class="message-container">
			<lazy-image class="profile-xsm" img-class="profile-xsm" :class="{ 'opacity-0': hideProfile }" :src="message.sender.profile"></lazy-image>
			<component v-bind="$props" :is="type"></component>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			type: () => import("./TextMessage"),
		};
	},
	created() {
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
		}
	},
	props: ["message", "hideProfile"],
};
</script>
