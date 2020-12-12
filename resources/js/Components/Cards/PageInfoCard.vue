<template>
	<div class="card h-100">
		<inertia-link :href="$APP_URL + '/' + page.slug" class="card-body p-0 d-flex flex-column">
			<lazy-image class="card-img-top page-cover page-cover-info-card" style="min-height: 90px" :src="page.cover" />
			<lazy-image img-class="profile" style="margin-top: -44px" :src="page.profile" />
			<div class="userinfo-card card-body py-0">
				<span class="text-black">
					{{ page.name }}
					<i v-if="page.type === 'personal' && page.user.is_verified" class="verificationcheck">check_circle</i>
				</span>
				<small class="text-muted text-center px-3">
					{{ page.short_bio }}
				</small>
			</div>
		</inertia-link>
		<ConnetionButtons class="py-3 d-flex justify-content-center align-items-center pt-5" :page-id="page.id" :user-id="page.user_id"></ConnetionButtons>
	</div>
</template>

<script>
import FollowButton from "../buttons/FollowButton";
import ConnectionButton from "../buttons/ConnectionButton";
export default {
	name: "PageInfoCard",
	components: {
		FollowButton,
		ConnectionButton,
	},
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
</style>
