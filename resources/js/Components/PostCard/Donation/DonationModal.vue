<template>
	<b-modal v-model="showModal" hide-footer :title="__.get('content/posts.tip-this-post')" body-class="donation-modal pb-0" header-class="tip-modal-header" size="md" :centered="true">
		<template #modal-header="{ close }" v-if="showDonate">
			<button type="button" @click="close" aria-label="Close" class="close">close</button>
			<lazy-image :src="post_data.page.profile" class="profile-md mb-0" imgClass="profile-md" />
		</template>
		<div v-if="showDonate">
			<h2 class="tip-modal--title">
				{{ __.get("content/posts.tip-this-post") }}
			</h2>
			<div class="tip-amount-input-group" :class="{ 'mb-52px': user != null }">
				<div class="d-flex align-items-center" dir="ltr">
					<div style="margin-right: 24px">
						<div class="currency-selector">
							<div>
								<img src="/images/iran-flag.png" alt="iran" width="24" />
								<span class="ms-2">{{ __.get("currencies.IRR-n") }}</span>
							</div>
						</div>
					</div>
					<div class="position-relative">
						<label v-if="amount.length > 0 && payAmount < 1000 && !focus" style="top: -24px" class="position-absolute text-danger font-12">{{ __.get("messages.tip-amount-not-enough") }}</label>
						<input v-numericOnly v-model="amount" @focus="focus = true" @blur="focus = false" class="form-control text-input donate-amount-input" :placeholder="__.get('tips.enter-amount')" />
					</div>
				</div>
				<div dir="ltr">
					<div class="d-flex mt-3 mb-4 justify-content-start w-100 payment-way">
						<span class="me-2">{{ __.get("tips.gateway") }} </span>
						<img src="/images/zarinpal-pay-logo.png" alt="زرین‌پال" width="73" />
					</div>
				</div>
				<div class="d-flex justify-content-center">
					<div class="donate-amount-badge" :class="{ active: amount == 100000 }" @click="amount = 100000">100,000 {{ __.get("currencies.IRR") }}</div>
					<div class="donate-amount-badge" :class="{ active: amount == 50000 }" @click="amount = 50000">50,000 {{ __.get("currencies.IRR") }}</div>
					<div class="donate-amount-badge" :class="{ active: amount == 20000 }" @click="amount = 20000">20,000 {{ __.get("currencies.IRR") }}</div>
				</div>
			</div>
			<div v-if="user == null" class="my-52px">
				<div class="d-flex align-items-center" dir="ltr">
					<tselect :items="country_codes" class="tselect-lg" @change="phone = countryCode.code" style="margin-right: 24px" valueOption="id" labelOption="country" v-model="countryCode">
						<template v-slot:icon>
							<span v-html="countryIcon"></span>
						</template>
						<template v-slot:itemIcon="{ icon }">
							<span v-html="getCountryIcon(icon)"></span>
						</template>
					</tselect>
					<input dir="ltr" class="form-control text-input" v-model="phone" />
				</div>
				<p class="mb-0 mt-4 text-grey font-demibold">{{ __.get("tips.guest-user-tip-des") }}</p>
			</div>
			<div class="donate-modal-body">
				<div class="d-flex align-items-center w-100">
					<div class="donate-payanonymouse me-3">
						<checkbox v-model="anonymous" class="text-superlight m-0 d-flex light">{{ __.get("tips.support-anonymously") }}</checkbox>
					</div>
					<loading-button :loading="loading" @click.native="pay" :disabled="payAmount < 1000 || loading || (user == null && !validPhone)" class="btn btn-primary w-100">{{ __.get("tips.pay") }}</loading-button>
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
import PhoneMixin from "../../../Mixins/PhoneMixin";

export default {
	methods: {
		pay() {
			let url = new URL(window.location.origin + "/zarinpal/pay");
			let params = url.searchParams;
			params.append("post_id", this.post);
			params.append("amount", this.payAmount);
			params.append("anonymous", this.anonymous ? 1 : 0);
			if (!this.user) {
				params.append("phone", this.phone);
			}
			window.open(url.toString(), "Payment");
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
	mixins: [ModalMixin, PhoneMixin],
	computed: {
		...mapState(["user"]),
		payAmount() {
			return !isNaN(parseInt(this.amount)) ? parseInt(this.amount) : 0;
		},
	},
	props: ["post", "post_data", "showDonate"],
	name: "DonationModal",
};
</script>