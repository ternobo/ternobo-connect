<template>
	<div class="community-card card h-100">
		<wire-link :href="`/tags/${community.tag}`" class="card-body p-0 d-flex flex-column">
			<lazy-image class="card-img-top page-cover page-cover-info-card" style="min-height: 90px" :src="assetURL(community.cover)" />
			<div :href="`/tags/${community.tag}`" class="d-flex align-items-center justify-content-center" style="margin-top: -34px; z-index: 1">
				<div class="community-icon">
					<img :src="assetURL(community.icon)" />
				</div>
			</div>
			<div class="community-card-body text-center card-body pt-6">
				<strong class="community-info-tag font-20"> {{ community.name }} </strong>
				<span class="font-16 font-demibold d-block mt-2">{{ community.category_name }}</span>
			</div>
		</wire-link>
		<div class="card-footer pt-4 no-border">
			<follow-tag-button class="w-100" :followed="community.is_followed" :tag="community.tag" />
		</div>
	</div>
</template>

<script>
import FollowTagButton from "../buttons/FollowTagButton.vue";
export default {
	components: { FollowTagButton },
	props: ["community"],
};
</script>