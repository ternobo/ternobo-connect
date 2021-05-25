<template>
	<div>
		<post-skeleton v-for="i in count" class="my-2" :key="`skeleton_item_index_${i}`" />
	</div>
</template>

<script>
import PostSkeleton from "./PostSkeleton.vue";
export default {
	components: { PostSkeleton },
	props: ["count"],
};
</script>

<style>
</style>