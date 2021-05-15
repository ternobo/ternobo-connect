<template>
	<div class="show-more-container" :class="{ active: value }" @click="$emit('input', !value)">
		<i class="material-icons-outlined">{{ value ? "visibility_off" : "visibility" }}</i>
		<span>{{ value ? "کمتر" : "بیشتر" }}</span>
	</div>
</template>

<script>
export default {
	props: ["value"],
};
</script>

<style>
</style>