<template>
	<base-layout>
		<div class="sidebar-right">
			<div class="card p-0">
				<div class="settings-item" :class="{ active: tab == 'account' }" @click="tab = 'account'">
					<i class="material-icons-outlined ml-2">account_circle</i>
					<span>حساب کاربری</span>
				</div>
				<div class="settings-item" :class="{ active: tab == 'about' }" @click="tab = 'about'">
					<i class="material-icons-outlined ml-2">account_circle</i>
					<span>درباره ترنوبو</span>
				</div>
			</div>
		</div>
		<div class="content-container-full">
			<component :is="currentComponent"></component>
		</div>
	</base-layout>
</template>

<script>
import { Inertia } from "@inertiajs/inertia";
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
