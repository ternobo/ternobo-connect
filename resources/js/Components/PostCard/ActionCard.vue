<template>
	<div class="action bg-white px-0 mb-4" v-if="action.post !== null">
		<post-card :post="action.post" />
	</div>
</template>

<script>
import PostCard from "./PostCard.vue";
export default {
	components: { PostCard },
	name: "ActionCard",
	props: {
		action: {
			type: Object,
			default: undefined,
			required: true,
		},
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style></style>
