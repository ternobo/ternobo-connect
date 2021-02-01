<template>
	<div class="card sticky-aside pb-4" v-if="$store.state.user != null">
		<lazy-image class="card-img-top page-cover" :src="$store.state.user.cover" />
		<wire-link :href="'/' + $store.state.user.username" class="userinfo-card">
			<div class="d-flex flex-column align-items-center">
				<div class="profile-image">
					<vue-circle :progress="$store.state.user.profile_steps.percent" :size="82" empty-fill="#F5F5F5" :show-percent="false" :start-angle="-Math.PI / 2" :fill="{ color: '#0898DF' }">
						<lazy-image :src="$store.state.user.profile" />
					</vue-circle>
				</div>
				<strong class="text-black">{{ this.$store.state.user.name }} <i v-if="$store.state.user.is_verified === 1" class="verificationcheck">check_circle</i> </strong>
				<small class="text-muted">{{ this.$store.state.user.short_bio }}</small>
			</div>
			<div class="done-precent d-flex">
				<strong class="text-white">{{ $store.state.user.profile_steps.percent }}%</strong>
			</div>
		</wire-link>
	</div>
</template>

<script>
export default {
	name: "UserInfoCard",
};
</script>

<style></style>
