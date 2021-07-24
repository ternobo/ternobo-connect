<template>
	<div class="comment">
		<div class="comment-header">
			<div class="d-flex align-items-center">
				<skeleton :circle="true" class="profile-xsm" />
				<div class="pagedetail">
					<skeleton width="120px"></skeleton>
				</div>
			</div>
			<div class="d-flex align-items-center">
				<span class="comment-time"><skeleton width="50px"></skeleton></span>
			</div>
		</div>
		<div class="comment-body" ref="body">
			<skeleton :count="3"></skeleton>
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