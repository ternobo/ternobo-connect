<template>
	<div class="background-upload-progress">
		<b-progress :value="progress" height="8px" animated variant="primary"></b-progress>
		<div class="icons">
			<i class="material-icons-outlined">publish</i>
		</div>
	</div>
</template>

<script>
export default {
	props: ["progress"],
};
</script>

<style>
</style>