<template>
	<div class="likes-list">
		<div v-for="i in 4" :key="'like_skeleton_' + i" class="like-item">
			<div class="userinfo">
				<skeleton circle class="profile-standard" :style="{ height: '64px', width: '64px' }" :color="skeletonOptions.profileColor"></skeleton>
				<div class="page-name mr-2 d-flex flex-column">
					<skeleton :style="{ height: '16px', width: '150px' }" :color="skeletonOptions.profileColor"></skeleton>
					<skeleton class="mt-2" :style="{ height: '16px', width: '150px' }"></skeleton>
				</div>
			</div>
			<skeleton :style="{ height: '30px', width: '100px' }"></skeleton>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>