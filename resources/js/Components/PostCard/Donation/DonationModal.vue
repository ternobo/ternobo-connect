<template>
	<b-modal v-model="showModal" hide-footer title="حمایت از این محتوا" body-class="donation-modal" size="md" :centered="true">
		<div v-if="showDonate">
			<div class="d-flex justify-content-between donate-modal-header">
				<div class="d-flex align-items-center">
					<lazy-image :src="user.profile" class="profile-xsm mb-0 me-2" imgClass="profile-xsm" />
					<strong>{{ user.name }}</strong>
				</div>
				<div>
					<div class="currency-selector">
						<div>
							<img src="/images/iran-flag.png" alt="iran" width="24" />
							<span class="ms-2">{{ __.get("currencies.IRR") }}</span>
						</div>
					</div>
					<div class="d-flex justify-content-between payment-way">
						<span>درگاه: </span>

						<img src="/images/zarinpal-pay-logo.png" alt="زرین‌پال" width="73" />
					</div>
				</div>
			</div>

			<div class="donate-modal-body">
				<div>
					<label v-if="amount.length > 0 && payAmount < 1000 && !focus" class="text-danger font-12">مبلغ دلخواه کافی نیست</label>
					<input v-numericOnly v-model="amount" @focus="focus = true" @blur="focus = false" class="form-control text-input donate-amount-input" placeholder="مبلغ دلخواه (حداقل ۱,۰۰۰ تومان)" />
				</div>
				<div class="d-flex">
					<div class="donate-amount-badge" :class="{ active: amount == 100000 }" @click="amount = 100000">100,000 تومان</div>
					<div class="donate-amount-badge" :class="{ active: amount == 50000 }" @click="amount = 50000">50,000 تومان</div>
					<div class="donate-amount-badge" :class="{ active: amount == 20000 }" @click="amount = 20000">20,000 تومان</div>
				</div>
				<div class="d-flex align-items-center pt-3 mt-3">
					<div class="donate-payanonymouse me-3">
						<checkbox v-model="anonymous" class="text-superlight m-0 d-flex light">حمایت به صورت ناشناس</checkbox>
					</div>
					<loading-button :loading="loading" @click.native="pay" :disabled="payAmount < 1000 || loading" class="btn btn-primary" style="width: 196px">پرداخت</loading-button>
				</div>
			</div>
		</div>
		<donations-list :class="{ 'cant-donate': !showDonate }" :post="post" />
	</b-modal>
</template>

<script>
import { mapState } from "vuex";
import ModalMixin from "../../../Mixins/Modal";
import VueNumeric from "vue-numeric";
import DonationsList from "./List/DonationsList.vue";
import Checkbox from "../../inputs/Checkbox.vue";

export default {
	methods: {
		pay() {
			window.open(`/zarinpal/pay?post_id=${this.post}&amount=${this.payAmount}&anonymous=${this.anonymous ? 1 : 0}`, "Payment");
		},
	},
	data() {
		return {
			amount: "",
			anonymous: false,

			focus: false,

			loading: false,
		};
	},
	components: { VueNumeric, DonationsList, Checkbox },
	mixins: [ModalMixin],
	computed: {
		...mapState(["user"]),
		payAmount() {
			return !isNaN(parseInt(this.amount)) ? parseInt(this.amount) : 0;
		},
	},
	props: ["post", "showDonate"],
	name: "DonationModal",
};
</script>

<style>
</style>
