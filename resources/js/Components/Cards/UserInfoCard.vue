<template>
	<div class="userinfo-card sticky-aside" v-if="user != null">
		<lazy-image style="min-height: 66px" :loadingColor="skeletonOptions.coverColor" class="card-img-top page-cover" :src="user.cover" />
		<div class="userinfo-card-body">
			<wire-link :href="shared.fullAccess ? pageUrl : null" :linkDisabled="!shared.fullAccess" class="profile-content">
				<div class="profile-image">
					<lazy-image class="profile-md bg-white" imgClass="profile-md" :loadingColor="skeletonOptions.profileColor" :src="user.profile" />
				</div>
				<strong class="text-gray-medium-dark font-12 text-start" dir="ltr">@{{ user.username }}</strong>
				<strong class="text-black">{{ user.name }} <i v-if="user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="text-muted">{{ user.short_bio }}</small>
			</wire-link>
			<i class="material-icons-outlined copyprofile-icon" v-b-tooltip.hover.ds700 v-if="shared.fullAccess" key="copyusername_item" :title="__.get('application.copy')" v-clipboard="profile_url">link</i>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "UserInfoCard",
	computed: {
		...mapState(["user", "shared"]),
		pageUrl() {
			return "/" + this.user.username;
		},
		profile_url() {
			return `${window.location.origin}/${this.user.username}`;
		},
	},
};
</script>

<style></style>
