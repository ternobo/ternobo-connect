<template>
	<div class="media-message">
		<b-modal v-model="showModal" body-class="p-0 d-flex" hide-footer hide-header size="lg" :centered="true">
			<img v-if="type == 'image'" :src="message.media[0]" class="w-100" />
		</b-modal>
		<div class="media">
			<img @click="showModal = true" v-if="type == 'image'" :src="message.media[0]" class="w-100" />
			<video-preview v-else-if="type == 'video'" :src="message.media[0]" />
			<voice-preview v-else-if="type == 'audio'" :src="message.media[0]" class="w-100" />
		</div>
		<pre class="caption" v-if="message.text != null">{{ message.text }}</pre>
	</div>
</template>

<script>
import VideoPreview from "../VideoPreview.vue";
import VoicePreview from "../VoicePreview.vue";
export default {
	data() {
		return {
			showModal: false,
		};
	},
	components: { VoicePreview, VideoPreview },
	computed: {
		type() {
			return this.message.type;
		},
	},
	props: ["message"],
};
</script>

<style>
</style>
