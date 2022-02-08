<template>
	<div class="media-block" :class="{ 'p-0': content != null }">
		<!--- Select Media !-->
		<div class="action-container">
			<span class="title text-center">
				<i class="material-icons-outlined">play_circle</i>
				{{ __.get(`editor.video-embed`) }}
			</span>
			<div class="media-block__actions">
				<div class="input-group-icon">
					<input class="form-control fill" />
					<i class="material-icons">subdirectory_arrow</i>
				</div>
			</div>
		</div>
		<!--- Select Media End !-->
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>