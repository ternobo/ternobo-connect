<template>
	<div class="card mb-4">
		<div class="py-3 px-5 d-flex align-items-center justify-content-between">
			<wire-link :href="`/tags/${tag.tag}`" class="community-tag-search-result d-flex">
				<div class="flex-column d-flex" v-if="tag.is_community_tag">
					<small class="hashtag-name">#{{ tag.tag }}</small>
				</div>
				<lazy-image :loadingColor="skeletonOptions.profileColor" class="community-icon" v-if="tag.is_community_tag" :src="tag.community.icon" />

				<strong class="font-16" v-else>#{{ tag.tag }}</strong>
			</wire-link>
			<follow-tag-button :followed="tag.is_followed" :tag="tag.tag"></follow-tag-button>
		</div>
	</div>
</template>

<script>
import FollowTagButton from "../buttons/FollowTagButton.vue";
export default {
	components: { FollowTagButton },
	props: ["tag"],
};
</script>