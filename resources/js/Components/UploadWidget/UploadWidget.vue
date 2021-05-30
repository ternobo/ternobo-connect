<template>
	<div class="background-upload-progress">
		<i class="material-icons-outlined text-grey clickable me-3" @click="$emit('cancel')" v-if="error">close</i>
		<b-progress dir="ltr" :value="progress" height="6px" variant="primary"></b-progress>
		<div class="icons d-flex">
			<i class="material-icons-outlined clickable me-2" @click="$emit('reload')" v-if="error">refresh</i>
			<i class="material-icons-outlined text-danger" v-if="error">error_outline</i>
			<i class="material-icons-outlined" v-else>publish</i>
		</div>
	</div>
</template>

<script>
export default {
	props: ["progress", "error"],
};
</script>

<style>
</style>