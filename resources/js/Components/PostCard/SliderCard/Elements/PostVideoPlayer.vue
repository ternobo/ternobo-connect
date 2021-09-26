<template>
	<div class="video-player">
		<video ref="video" v-bind="$attrs"></video>
	</div>
</template>

<script>
import Plyr from "plyr";
export default {
	data() {
		return {
			player: null,

			isPaused: true,
		};
	},
	mounted() {
		const video = this.$refs.video;
		this.player = new Plyr(video);
		this.$nextTick(() => {
			this.player.on("play", (event) => {
				const instance = event.detail.plyr;
				instance.elements.controls.classList.add("fistplay");
			});

			const observer = new IntersectionObserver(
				(entry) => {
					if (entry.intersectionRatio != 1 && !video.paused) {
						video.pause();
						this.isPaused = true;
					} else if (this.isPaused) {
						video.play();
						this.isPaused = false;
					}
				},
				{ threshold: 1 }
			);
			observer.observe(this.$el);
		});
	},
};
</script>

<style lang="scss">
.plyr__controls:not(.fistplay) {
	display: none;
}
</style>