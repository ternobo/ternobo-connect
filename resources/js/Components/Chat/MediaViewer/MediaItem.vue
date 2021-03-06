<template>
	<div class="media w-25">
		<b-modal v-model="showModal" v-if="media.meta.mime.startsWith('image')" body-class="p-0 d-flex" hide-footer hide-header size="lg" :centered="true">
			<img :src="'/' + media.filename" class="w-100" />
		</b-modal>
		<lazy-image v-if="media.meta.mime.startsWith('image')" :src="'/' + media.filename" class="w-100 clickable" @click.native="showModal = true" />
		<video-preview v-else-if="media.meta.mime.startsWith('video')" :src="'/' + media.filename" class="w-100" />
		<voice-preview v-else-if="media.meta.mime.startsWith('audio')" :src="'/' + media.filename" class="w-100" />
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
	components: { VideoPreview, VoicePreview },
	props: ["media"],
};
</script>

<style>
</style>
