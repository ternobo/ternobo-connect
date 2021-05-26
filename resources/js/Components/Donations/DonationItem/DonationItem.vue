<template>
	<div class="donation-item">
		<donation-detail-modal :show.sync="showModal" :tip="tip"></donation-detail-modal>
		<div class="donate-payer-info">
			<i class="material-icons donate-type" :class="{ received: !tip.donate_by_me }">play_for_work</i>
			<lazy-image :src="profile" circle :loadingColor="skeletonOptions.profileColor" class="profile-xxsm tip-profile mb-0" imgClass="profile-xxsm"></lazy-image>
			<strong class="tip-name">{{ name }}</strong>
		</div>
		<div class="donate-detail-group">
			<div :class="{ 'badge-success': !tip.donate_by_me, 'badge-blue': tip.donate_by_me }">
				<strong class="font-demibold">{{ formatNumber(tip.amount, "0,0") }}</strong>
				<span>تومان</span>
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
				<button class="btn tip-btn" @click="showModal = !showModal">جزئیات</button>
			</div>
		</div>
	</div>
</template>

<script>
import DonationDetailModal from "../DonationDetailModal.vue";
export default {
	components: { DonationDetailModal },
	name: "DonationItem",
	data() {
		return {
			showModal: false,
		};
	},
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