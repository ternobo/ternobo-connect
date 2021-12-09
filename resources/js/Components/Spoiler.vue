<template>
	<span class="spoiler" @click="show = true" :class="{ show: show }"><slot></slot></span>
</template>

<script>
export default {
	inheritAttrs: false,
	data() {
		return {
			show: false,
		};
	},
};
</script>