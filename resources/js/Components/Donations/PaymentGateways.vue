<template>
	<div class="payment-gateways">
		<div class="card">
			<div class="card-body">
				<div class="d-flex justify-content-center payment-logo">
					<img src="/images/zarinpal-logo.png" />
				</div>
				<strong class="text-superlight font-14">{{ __.get("tips.merchant-id") }}</strong>
				<div class="payment-input text-center" v-if="!loading">
					<input type="text" class="form-control lg-input" maxlength="36" v-model="merchant" spellcheck="false" v-if="!active" />
					<span class="text-muted payment-code" v-else>{{ merchant }}</span>
				</div>
				<div class="payment-input text-center" v-else>
					<skeleton height="33px" />
				</div>
				<div class="d-flex justify-content-between align-items-lg-center payment-active-gateway">
					<label class="activation-label">{{ __.get("tips.activate") }}</label>
					<switches v-model="active" :disabled="disabled"></switches>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Switches from "../inputs/Switch.vue";
export default {
	mounted() {
		this.loading = true;
		axios
			.post("/tips/settings")
			.then((response) => {
				this.merchant = response.data.gateways.zarinpal.merchant_id;
				this.active = response.data.gateways.zarinpal.enabled;
			})
			.catch((err) => {
				console.log(err);
				this.toast(__.get("messages.error-in-get-data"));
			})
			.then(() => (this.loading = false));
	},
	watch: {
		active() {
			this.loading = true;
			axios
				.put("/tips/settings", {
					zarinpal: {
						merchant_id: this.merchant,
						enabled: this.active,
					},
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.error-in-get-data"));
				})
				.then(() => (this.loading = false));
		},
	},
	computed: {
		disabled() {
			return this.loading || this.merchant.length < 36;
		},
	},
	data() {
		return {
			active: false,
			merchant: "",

			loading: true,
		};
	},
	components: { Switches },
};
</script>

<style>
</style>