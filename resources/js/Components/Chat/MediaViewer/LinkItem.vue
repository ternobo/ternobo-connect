<template>
	<div class="link-item d-flex align-items-center">
		<i class="material-icons ms-1">link</i>
		<a target="_blank" style="line-height: 1" class="text-action" dir="ltr" :href="link.name.trim()">{{ link.name.trim() }}</a>
	</div>
</template>

<script>
export default {
	props: ["link"],
};
</script>

<style>
</style>
