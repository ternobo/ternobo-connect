<template>
	<div class="feedback-card">
		<div class="card-body">
			<div class="feedback-actions">
				<div class="feedback-votes">
					<skeleton></skeleton>
				</div>
				<skeleton :classes="['feedback-vote-button']"></skeleton>
				<skeleton :classes="['feedback-vote-button']"></skeleton>
			</div>

			<div class="feedback-content">
				<skeleton class="feedback-title" :color="this.skeletonOptions.profileColor" height="2.5rem" width="10rem"></skeleton>
				<p class="feedback-description-text">
					<skeleton :classes="['mb-2']" :count="3"></skeleton>
				</p>
			</div>
			<div class="feedback-label-container">
				<skeleton width="8rem" height="2rem"></skeleton>
			</div>
		</div>
		<div class="card-footer">
			<div class="feedback-publisher-info">
				<div class="publisher-name">
					<skeleton :circle="true" class="profile-xxsm me-3" />
					<div class="d-flex flex-column">
						<div class="d-flex align-items-center">
							<skeleton width="120px"></skeleton>
						</div>
						<skeleton class="mt-2" width="140px"></skeleton>
					</div>
				</div>
				<skeleton :classes="['feedback-vote-button']"></skeleton>
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