<template>
	<button class="rounded-add-btn" @click="$emit('click', $event)"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style>
</style>