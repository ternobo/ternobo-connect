<template>
	<div class="explore-page-content row">
		<div class="col-md-3 mb-4" v-for="i in 20" :key="`community_loading_item_${i}`">
			<community-card-skeleteton />
		</div>
	</div>
</template>

<script>
import CommunityCardSkeleteton from "./CommunityCardSkeleteton.vue";
export default {
	components: { CommunityCardSkeleteton },
};
</script>

<style>
</style>
