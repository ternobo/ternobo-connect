<template>
	<div class="card h-100">
		<wire-link :href="$APP_URL + '/' + page.slug" class="card-body p-0 d-flex flex-column">
			<lazy-image class="card-img-top page-cover page-cover-info-card" style="min-height: 90px" :src="page.cover" />
			<div class="d-flex align-items-center justify-content-center" style="margin-top: -70px">
				<lazy-image img-class="profile-100px" class="profile-100px mb-0" :src="page.profile" />
			</div>
			<div class="userinfo-card card-body pt-4">
				<span class="text-dark text-center">
					{{ page.name }}
					<i v-if="page.type === 'personal' && page.user.is_verified" class="verificationcheck">check_circle</i>
				</span>
				<small class="text-muted text-center mt-2 px-3">
					{{ page.short_bio }}
				</small>
			</div>
		</wire-link>
		<div class="pt-4 d-flex justify-content-center" style="padding-bottom: 32px; padding-left: 32px; padding-right: 32px">
			<follow-button class="w-100" @followed="$emit('followed')" @unfollowed="$emit('unfollowed')" :page="page.id"></follow-button>
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

<style scoped>
small {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>
