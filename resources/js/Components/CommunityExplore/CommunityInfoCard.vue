<template>
	<div class="community-card card h-100">
		<wire-link class="card-body p-0 d-flex flex-column" :href="`/tags/${community.tag}`">
			<lazy-image class="card-img-top page-cover page-cover-info-card" style="min-height: 90px" :src="assetURL(community.cover)" />
			<div class="d-flex align-items-center justify-content-center" style="margin-top: -34px; z-index: 1">
				<div class="community-icon">
					<img :src="assetURL(community.icon)" />
				</div>
			</div>
			<div class="community-card-body text-center card-body pt-6">
				<div class="d-flex flex-column">
					<strong class="font-20"> {{ community.name }} </strong>
					<span class="community-info-tag mt-2"> {{ community.tag }} </span>
				</div>

				<follow-tag-button class="mt-7 w-100" :tag="community.tag" />
			</div>
		</wire-link>
	</div>
</template>

<script>
import FollowTagButton from "../buttons/FollowTagButton.vue";
export default {
	components: { FollowTagButton },
	props: ["community"],
};
</script>