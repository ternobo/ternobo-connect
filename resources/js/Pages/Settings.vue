<template>
	<base-layout>
		<div class="sidebar-start sticky-settings">
			<div class="card settings-card p-0">
				<div class="settings-item" :class="{ active: tab == 'account' }" @click="tab = 'account'">
					<i class="material-icons-outlined me-2">account_circle</i>
					<span>{{ __.get("settings.account") }}</span>
				</div>
				<div class="settings-item" :class="{ active: tab == 'about' }" @click="tab = 'about'">
					<i class="ternoboiconslogo-grey me-1 font-24"></i>
					<span>{{ __.get("settings.about-ternobo") }}</span>
				</div>
			</div>
		</div>
		<div class="content-container-settings" style="padding-bottom: 100px">
			<component :is="currentComponent"></component>
		</div>
	</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";

export default {
	data() {
		return {
			tab: "account",
		};
	},
	computed: {
		currentComponent() {
			return this.tab == "account" ? () => import("../Components/Settings/AccountTab") : () => import("../Components/Settings/AboutTab");
		},
	},
	name: "Settings",
	layout: AppLayout,
};
</script>

<style></style>
