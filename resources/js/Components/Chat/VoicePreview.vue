<template>
	<div class="voice-preview">
		<span class="text-action">{{ timerText }}</span>
		<div class="progress" ref="progressBar" @click="seekTime">
			<span class="progress-bg"></span>
			<span class="progress-fill" :style="{ width: progress + '%' }"></span>
		</div>
		<i class="material-icons text-action" @click="isPlaying = !isPlaying">{{ isPlaying ? "pause_circle_outline" : "play_circle_outline" }}</i>
	</div>
</template>

<script>
export default {
	methods: {
		seekTime(e) {
			const timelineWidth = window.getComputedStyle(this.$refs.progressBar).width;
			const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
			this.audio.currentTime = timeToSeek;
			this.progress = (this.audio.currentTime / this.audio.duration) * 100;
		},
		updateProgress() {
			this.progress = (this.audio.currentTime / this.audio.duration) * 100;
			this.timerText = this.getTimeCodeFromNum(this.audio.duration - this.audio.currentTime);
			if (this.progress == 100) {
				this.isPlaying = false;
				this.currentTime = 0;
			}
		},
		getTimeCodeFromNum(num) {
			let seconds = parseInt(num);
			let minutes = parseInt(seconds / 60);
			seconds -= minutes * 60;
			const hours = parseInt(minutes / 60);
			minutes -= hours * 60;

			if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
			return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
		},
	},
	watch: {
		isPlaying(newVal) {
			if (newVal) {
				this.audio.play();
			} else {
				this.audio.pause();
			}
		},
	},
	created() {
		this.audio = new Audio(this.src);
		setTimeout(() => {
			if (this.audio.duration == Infinity || this.audio.duration == NaN) {
				this.audio.currentTime = 60 * 99;
				setTimeout(() => {
					this.audio.currentTime = 0;
					setInterval(this.updateProgress, 500);
				}, 1000);
			}
		}, 1000);
	},
	mounted() {},
	destroyed() {
		clearInterval(this.updateProgress);
	},
	data() {
		return {
			audio: null,

			isPlaying: false,
			progress: 0,
			timerText: "00:00",
		};
	},
	props: ["src"],
};
</script>

<style>
</style>
