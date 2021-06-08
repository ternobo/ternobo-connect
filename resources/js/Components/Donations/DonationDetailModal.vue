<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('donations.donate-details')" modal-class="new-post-modal" size="md" :centered="true">
		<div class="new-post position-relative">
			<div class="selections">
				<div class="donation-modal-header">
					<div class="donate-payer-info">
						<span class="donated_by">{{ __.get("donations.supporter") }}:‌ </span>
						<lazy-image :src="profile" circle :loadingColor="skeletonOptions.profileColor" class="profile-xxsm tip-profile mb-0" imgClass="profile-xxsm"></lazy-image>
						<strong class="tip-name">{{ name }}</strong>
					</div>

					<div class="donation-amount-detail">
						<div :class="{ 'badge-success': !tip.donate_by_me, 'badge-blue': tip.donate_by_me }">
							<strong class="font-demibold">{{ formatNumber(tip.amount, "0,0") }}</strong>
							<span :class="{ received: !tip.donate_by_me }">{{ __.get("currencies.IRR") }}</span>
						</div>
						<i class="material-icons donate-type" :class="{ received: !tip.donate_by_me }">play_for_work</i>
					</div>
				</div>
			</div>
		</div>

		<div class="donation-detail-content">
			<div class="donation-detail-item">
				<span class="text-grey font-16 font-demibold">{{ __.get("donations.date") }}</span>
				<span class="text-grey font-16 font-demibold">{{ date }}</span>
			</div>
			<div class="donation-detail-item">
				<span class="text-grey font-16 font-demibold">{{ __.get("donations.time") }}</span>
				<span class="text-grey font-16 font-demibold">{{ time }}</span>
			</div>
			<div class="donation-detail-item">
				<span class="text-grey font-16 font-demibold">{{ __.get("donations.transaction-id") }}</span>
				<span class="text-grey font-16 font-demibold">{{ tip.meta.transaction_id }}</span>
			</div>
			<div class="donation-detail-item">
				<span class="text-grey font-16 font-demibold">{{ __.get("donations.reference-id") }}</span>
				<span class="text-grey font-16 font-demibold">{{ tip.meta.reference_id }}</span>
			</div>
			<div class="donation-detail-item">
				<span class="text-grey font-16 font-demibold">{{ __.get("donations.supporter-ip") }}</span>
				<span class="text-grey font-16 font-demibold">{{ tip.meta.ip }}</span>
			</div>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
export default {
	mixins: [ModalMixin],
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
				return this.__.get("donations.unknown");
			}
			return this.tip.donate_by_me ? this.__.get("donations.you") : this.tip.user.name;
		},
		profile() {
			if (!this.tip.donate_by_me && this.tip.anonymous) {
				return "/img/man-profile.png";
			}
			return this.tip.donate_by_me ? this.$store.state.user.profile : this.tip.user.profile;
		},
	},
	name: "DonationDetailModal",
};
</script>

<style>
</style>
