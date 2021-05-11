<template>
	<div class="loadingspinner" :style="{ height: `${height}px`, width: `${width}px` }"></div>
</template>

<script>
export default {
	name: "LoadingSpinner",
	props: ["height", "width"],
};
</script>

<style>
</style>
