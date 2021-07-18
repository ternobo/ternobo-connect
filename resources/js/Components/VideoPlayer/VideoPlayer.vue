<template>
	<video v-bind="$attrs"></video>
</template>

<script>
import Plyr from "plyr";
export default {
	mounted() {
		this.player = new Plyr(this.$el);
	},
};
</script>

<style>
</style>