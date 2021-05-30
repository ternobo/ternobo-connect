<template>
	<div class="people-sugestion">
		<div class="suggestion-info-link">
			<skeleton circle class="profile-standard" :style="{ height: '64px', width: '64px' }" :color="skeletonOptions.profileColor"></skeleton>
			<div class="page-name ms-2 d-flex flex-column">
				<skeleton :style="{ height: '16px', width: '150px' }" :color="skeletonOptions.profileColor"></skeleton>
				<skeleton class="mt-2" :style="{ height: '16px', width: '150px' }"></skeleton>
			</div>
		</div>
		<skeleton :style="{ height: '30px', width: '100px' }"></skeleton>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>