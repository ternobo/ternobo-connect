<template>
	<div>
		<feedback-skeleton v-for="i in 5" class="mb-4" :key="`feedback_loading_${i}`"></feedback-skeleton>
	</div>
</template>

<script>
import FeedbackSkeleton from "./FeedbackSkeleton.vue";
export default {
	components: { FeedbackSkeleton },
};
</script>

<style>
</style>