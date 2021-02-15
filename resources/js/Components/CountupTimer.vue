<template>
	<div><label ref="minutes">00</label>:<label ref="seconds">00</label></div>
</template>

<script>
export default {
	mounted() {
		var minutesLabel = this.$refs.minutes;
		var secondsLabel = this.$refs.seconds;
		var totalSeconds = 0;
		setInterval(setTime, 1000);

		function setTime() {
			++totalSeconds;
			secondsLabel.innerHTML = pad(totalSeconds % 60);
			minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
		}

		function pad(val) {
			var valString = val + "";
			if (valString.length < 2) {
				return "0" + valString;
			} else {
				return valString;
			}
		}
	},
};
</script>

<style>
</style>
