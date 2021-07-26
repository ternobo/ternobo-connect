<template>
	<div class="userinfo-card sticky-aside" v-if="$store.state.user != null">
		<lazy-image style="min-height: 66px" :loadingColor="skeletonOptions.coverColor" class="card-img-top page-cover" :src="$store.state.user.cover" />
		<div class="userinfo-card-body">
			<wire-link :href="'/' + $store.state.user.username" class="profile-content">
				<div class="profile-image">
					<lazy-image class="profile-md bg-white" imgClass="profile-md" :loadingColor="skeletonOptions.profileColor" :src="$store.state.user.profile" />
				</div>
				<strong class="text-black">{{ this.$store.state.user.name }} <i v-if="$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="text-muted">{{ this.$store.state.user.short_bio }}</small>
			</wire-link>
			<i class="material-icons-outlined copyprofile-icon" v-b-tooltip.hover.ds700 key="copyusername_item" :title="__.get('application.copy')" v-clipboard="profile_url">link</i>
		</div>
	</div>
</template>

<script>
export default {
	name: "UserInfoCard",
	computed: {
		profile_url() {
			return `${window.location.origin}/${this.$store.state.user.username}`;
		},
	},
};
</script>

<style></style>
