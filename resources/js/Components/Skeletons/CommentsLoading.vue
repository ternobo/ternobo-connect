<template>
	<div class="w-100">
		<comment-skeleton v-for="i in 2" :key="`skeleton_${i}`"></comment-skeleton>
	</div>
</template>

<script>
import CommentSkeleton from "./CommentSkeleton.vue";
export default {
	components: { CommentSkeleton },
};
</script>