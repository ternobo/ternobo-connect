<template>
	<base-layout>
		<div class="sidebar-start sticky-settings">
			<div class="card settings-card sticky-aside">
				<div class="settings-item" :class="{ active: tab == 'donations' }" @click="tab = 'donations'">
					<i class="material-icons-outlined me-2">savings</i>
					<span>{{ __.choice("tips.tip", 2) }}</span>
				</div>
				<div class="settings-item" :class="{ active: tab == 'settings' }" @click="tab = 'settings'">
					<i class="material-icons-outlined me-2"> credit_card </i>
					<span>{{ __.get("tips.paymentgateway") }}</span>
				</div>
			</div>
		</div>
		<div class="content-container-settings" style="padding-bottom: 100px">
			<component :is="currentComponent"></component>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout.vue";
export default {
	mounted() {
		let params = new URLSearchParams(window.location.search);
		this.tab = params.get("tab") != null ? params.get("tab") : "donations";
	},
	data() {
		return {
			tab: "donations",
		};
	},
	computed: {
		currentComponent() {
			return this.tab == "donations" ? () => import("../../Components/Donations/Donations") : () => import("../../Components/Donations/PaymentGateways");
		},
	},
	name: "Donation",
	layout: AppLayout,
};
</script>

<style>
</style>