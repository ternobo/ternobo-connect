<template>
	<div class="voice-message">
		<voice-preview :class="{ received: message.sender.id != $store.state.user.id }" :src="voice"></voice-preview>
	</div>
</template>

<script>
import VoicePreview from "../VoicePreview.vue";
export default {
	computed: {
		voice() {
			if (typeof this.message.media[0] == "object") {
				return URL.createObjectURL(this.message.media[0]);
			}
			return "/" + this.message.media[0];
		},
	},
	components: { VoicePreview },
	props: ["message"],
};
</script>
