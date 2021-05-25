<template>
	<div class="post-box">
		<div class="post-header align-items-center pt-0">
			<div class="publisher">
				<skeleton class="profile-sm" :color="skeletonOptions.profileColor" width="48px" height="48px" circle></skeleton>
				<div class="d-flex justify-content-center flex-column">
					<skeleton height="24px" width="80px" :color="skeletonOptions.profileColor"></skeleton>
				</div>
			</div>
			<div class="actions position-relative">
				<skeleton height="24px" width="100px" :color="skeletonOptions.profileColor"></skeleton>
			</div>
		</div>
		<div class="post-body">
			<skeleton style="width: 50%" height="24px" :color="skeletonOptions.profileColor" class="mb-4" :count="1"></skeleton>
			<skeleton style="width: 100%" height="300px" :count="1"></skeleton>
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