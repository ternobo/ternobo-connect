<template>
	<video v-bind="$attrs"></video>
</template>

<script>
import Plyr from "plyr";
export default {
	data() {
		return {
			player: null,
		};
	},
	mounted() {
		this.player = new Plyr(this.$el);
		this.$nextTick(() => {
			this.player.on("play", (event) => {
				const instance = event.detail.plyr;
				instance.elements.controls.classList.add("fistplay");
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