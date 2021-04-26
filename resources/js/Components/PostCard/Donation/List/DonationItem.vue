<template>
	<div class="donation-list-item">
		<div class="donation-user">
			<lazy-image :src="profile" imgClass="profile-xxsm" class="profile-xxsm mb-0 user-profile" />
			<strong class="user-name">{{ isByMe ? "شما" : name }}</strong>
		</div>
		<div class="donation-amount" :class="{ received: !isByMe }">{{ amount }} تومان</div>
	</div>
</template>

<script>
export default {
	computed: {
		name() {
			return this.tip.anonymous ? "ناشناس" : this.tip.user.name;
		},
		profile() {
			return this.tip.anonymous ? "/img/man-profile.png" : this.tip.user.profile;
		},
		isByMe() {
			return this.tip.user_id === this.$store.state.user.id;
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