<template>
	<button class="btn btn-primary btn-icon btn-rounded" @click="$emit('click', $event)"><slot></slot></button>
</template>

<script>
export default {};
</script>

<style>
</style>