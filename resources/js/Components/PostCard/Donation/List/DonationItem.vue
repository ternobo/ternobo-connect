<template>
	<div class="donation-list-item">
		<div class="donation-user">
			<lazy-image :src="profile" imgClass="profile-xxsm" class="profile-xxsm mb-0 user-profile" />
			<strong class="user-name">{{ name }}</strong>
		</div>
		<div class="donation-amount" :class="{ received: !isByMe }">
			<span>{{ formatNumber(amount, "0,0") }}</span> <span>تومان</span>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		name() {
			if (!this.tip.guest) {
				return this.tip.anonymous ? __.get("tips.anonymous") : this.tip.user.name;
			}
			return __.get("application.guest-user");
		},
		profile() {
			if (!this.tip.guest) {
				return this.tip.anonymous ? "/img/man-profile.png" : this.tip.user.profile;
			}
			return "/img/man-profile.png";
		},
		isByMe() {
			if (this.$store.state.user) {
				return this.tip.user_id === this.$store.state.user.id;
			}
			return false;
		},
		amount() {
			return this.tip.amount;
		},
	},
	props: ["tip"],
};
</script>

<style>
</style>