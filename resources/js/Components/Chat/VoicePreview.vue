<template>
	<div class="voice-preview">
		<span class="audio-duration">{{ timerText }}</span>
		<div class="progress" ref="progressBar" @click="seekTime">
			<span class="progress-bg clickable"></span>
			<span class="progress-fill" :style="{ width: progress + '%' }"></span>
		</div>
		<i class="material-icons audio-playpause" :class="{ disabled: loading, clickable: !loading }" @click="playPause">{{ isPlaying ? "pause_circle_outline" : "play_circle_outline" }}</i>
	</div>
</template>

<script>
export default {
	methods: {
		playPause() {
			if (!this.loading) {
				this.isPlaying = !this.isPlaying;
			}
		},
		seekTime(e) {
			const timelineWidth = window.getComputedStyle(this.$refs.progressBar).width;
			const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * this.audio.duration;
			this.audio.currentTime = timeToSeek;
			this.progress = (this.audio.currentTime / this.audio.duration) * 100;
		},
		updateProgress() {
			this.progress = Number.parseInt((this.audio.currentTime / this.audio.duration) * 100);
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
		isPlaying(newVal, oldVal) {
			if (!this.loading) {
				if (newVal) {
					this.audio.play();
				} else {
					this.audio.pause();
				}
			} else {
				return oldVal;
			}
		},
	},
	created() {
		this.audio = new Audio(this.src);
		this.audio.ontimeupdate = this.updateProgress;
		this.audio.onloadeddata = () => {
			if (this.audio.duration == Infinity || this.audio.duration == NaN) {
				this.loading = true;
				setTimeout(() => {
					this.audio.currentTime = 60 * 99;
					setTimeout(() => {
						this.audio.currentTime = 0;
						this.timerText = this.getTimeCodeFromNum(this.audio.duration - this.audio.currentTime);
						this.loading = false;
					}, 1000);
				}, 1000);
			} else {
				this.loading = false;
			}
		};
	},
	mounted() {},
	destroyed() {
		this.audio.pause();
		this.audio.remove();
	},
	data() {
		return {
			audio: null,

			isPlaying: false,
			progress: 0,
			timerText: "00:00",
			loading: true,
		};
	},
	props: ["src"],
};
</script>

<style>
</style>
