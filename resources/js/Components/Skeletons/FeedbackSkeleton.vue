<template>
	<div class="post-box">
		<div class="post-body">
			<div class="mb-4 d-flex justify-content-between align-items-center">
				<skeleton style="width: 50%" height="24px" :color="skeletonOptions.profileColor" :count="1"></skeleton>
				<skeleton height="24px" width="100px" :color="skeletonOptions.profileColor"></skeleton>
			</div>
			<skeleton style="width: 100%" :count="10"></skeleton>
		</div>
		<div class="post-header align-items-center">
			<div class="publisher">
				<skeleton class="profile-sm" :color="skeletonOptions.profileColor" width="48px" height="48px" circle></skeleton>
				<div class="d-flex justify-content-center flex-column">
					<skeleton height="24px" width="80px" :color="skeletonOptions.profileColor"></skeleton>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Skeleton from "../Skeleton/Skeleton.vue";
export default {
	components: { Skeleton },
};
</script>

<style>
</style>