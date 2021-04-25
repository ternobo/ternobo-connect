<template>
	<div class="donation-item">
		<div class="d-flex align-items-center justify-content-between col-4">
			<div class="d-flex align-items-center">
				<i class="material-icons donate-type" :class="{ received: !tip.donate_by_me }">play_for_work</i>
				<lazy-image :src="profile" class="profile-sm tip-profile mb-0" imgClass="profile-sm"></lazy-image>
				<strong class="tip-name">{{ name }}</strong>
			</div>
			<div>
				<strong :class="{ 'text-success': !tip.donate_by_me, 'text-action': tip.donate_by_me }">{{ formatNumber(tip.amount, "0,0") }}</strong>
				<span>تومان</span>
			</div>
		</div>
		<div class="doantion-time">
			<span>{{ time }}</span>
			<strong class="mx-2">|</strong>
			<span>{{ date }}</span>
		</div>
		<wire-link :href="`/posts/${tip.post_id}`" class="cliackable text-grey">
			<i class="material-icons">launch</i>
			<span class="clickable">مشاهده محتوا</span>
		</wire-link>
		<div>
			<button class="btn tip-btn">جزئیات بیشتر</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "DonationItem",
	props: ["tip"],
	computed: {
		time() {
			return new PersianDate(this.tip.created_at).format("HH:mm");
		},
		date() {
			return new PersianDate(this.tip.created_at).format("YYYY/MM/DD");
		},
		name() {
			if (!this.tip.donate_by_me && this.tip.anonymous) {
				return "ناشناس";
			}
			return this.tip.donate_by_me ? "شما" : this.tip.user.name;
		},
		profile() {
			if (!this.tip.donate_by_me && this.tip.anonymous) {
				return "/img/man-profile.png";
			}
			return this.tip.donate_by_me ? this.$store.state.user.profile : this.tip.user.profile;
		},
	},
};
</script>

<style>
</style>