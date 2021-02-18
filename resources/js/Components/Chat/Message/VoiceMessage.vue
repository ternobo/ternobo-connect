<template>
	<div class="voice-message">
		<voice-preview :src="'/' + message.media[0]"></voice-preview>
	</div>
</template>

<script>
import VoicePreview from "../VoicePreview.vue";
export default {
	components: { VoicePreview },
	props: ["message"],
};
</script>
