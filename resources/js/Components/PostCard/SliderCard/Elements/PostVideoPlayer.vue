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
	destroyed() {
		this.player.destroy();
	},
	mounted() {
		const video = this.$refs.video;
		this.player = new Plyr(video);
		this.$nextTick(() => {
			this.player.on("play", (event) => {
				const instance = event.detail.plyr;
				instance.elements.controls.classList.add("fistplay");
			});

			this.player.on("ready", () => {
				const observer = new IntersectionObserver(
					(entry) => {
						if (!entry.isVisible) {
							video.pause();
						} else {
							video.play();
						}
					},
					{ threshold: 0.5 }
				);
				observer.observe(this.player.media);
			});
		});
	},
};
</script>

<style lang="scss">
.plyr__controls:not(.fistplay) {
	display: none;
}
</style>