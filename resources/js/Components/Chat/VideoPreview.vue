<template>
	<div class="ternobo-vide-player" @click="showModal = true">
		<video-player-modal :show.sync="showModal" :src="src"></video-player-modal>
		<video :src="src" />
	</div>
</template>

<script>
import VideoPlayerModal from "../VideoPlayer/VideoPlayerModal.vue";
export default {
	data() {
		return {
			showModal: false,
		};
	},
	components: { VideoPlayerModal },
	props: ["src"],
};
</script>

<style>
</style>
