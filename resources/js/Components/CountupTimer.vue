<template>
	<div><label ref="minutes">00</label>:<label ref="seconds">00</label></div>
</template>

<script>
export default {
	data() {
		return {
			minutesLabel: null,
			secondsLabel: null,
			totalSeconds: 0,
		};
	},
	methods: {
		setTime() {
			this.totalSeconds++;
			this.secondsLabel.innerHTML = this.pad(this.totalSeconds % 60);
			this.minutesLabel.innerHTML = this.pad(parseInt(this.totalSeconds / 60));
		},

		pad(val) {
			var valString = val + "";
			if (valString.length < 2) {
				return "0" + valString;
			} else {
				return valString;
			}
		},
	},

	destroyed() {
		clearInterval(this.setTime);
	},

	mounted() {
		this.minutesLabel = this.$refs.minutes;
		this.secondsLabel = this.$refs.seconds;
		setInterval(this.setTime, 1000);
	},
};
</script>

<style>
</style>
