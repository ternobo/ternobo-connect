<template>
	<div class="card h-100">
		<wire-link :href="$APP_URL + '/' + page.slug" :linkDisabled="!page.visible" class="card-body p-0 d-flex flex-column">
			<lazy-image class="card-img-top page-cover page-cover-info-card" style="min-height: 90px" :src="page.cover" />
			<div class="d-flex align-items-center justify-content-center" style="margin-top: -70px">
				<lazy-image img-class="pageinfo-card-profile profile-xlg" class="profile-xlg mb-0" :src="page.profile" />
			</div>
			<div class="userinfo-card text-center card-body pt-4">
				<span class="d-flex align-items-center justify-content-center text-dark text-center">
					<user-badges class="me-1" :onlyOne="true" :badgeStatus="page.badge_status" />
					{{ page.name }}
				</span>
				<small class="text-muted text-center mt-2 px-3">
					{{ page.short_bio }}
				</small>
			</div>
		</wire-link>
		<div class="pt-4 d-flex justify-content-center" style="padding-bottom: 32px; padding-left: 32px; padding-right: 32px">
			<follow-button class="w-100" @followed="$emit('followed')" @unfollowed="$emit('unfollowed')" :page="page"></follow-button>
		</div>
	</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton.vue";
export default {
	components: { FollowButton },
	name: "PageInfoCard",
	props: {
		page: {
			type: Object,
			default: undefined,
			required: true,
		},
	},
};
</script>

<style>
.pageinfo-card-profile {
	border: 8px solid #fff;
}
</style>
<style scoped>
small {
	display: block;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	width: 100%;
}
</style>
