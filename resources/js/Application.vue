<template>
	<div>
		<transition name="fade">
			<InertiaApp v-bind="$props"></InertiaApp>
		</transition>
		<transition name="toast" mode="out-in">
			<div class="toast-container" v-if="toasts.length > 0">
				<transition-group name="toast" mode="out-in">
					<toast v-for="(toast, index) in toasts" :key="toast.id" @timeout="toasts.splice(index, 1)" v-bind="toast"></toast>
				</transition-group>
			</div>
		</transition>
	</div>
</template>

<script>
import { InertiaApp } from "@inertiajs/inertia-vue";
import App from "./Layouts/App";
import { Inertia } from "@inertiajs/inertia";

import Toast from "./Components/Toast";

import { v4 as uuidv4 } from "uuid";

export default {
	methods: {
		addToast(toast) {
			toast.id = uuidv4();
			if (this.toasts.length > 0) {
				toast.timeout = 4000 * (this.toasts.length + 1);
			} else {
				toast.timeout = 4000;
			}
			this.toasts.push(toast);
		},
	},
	data() {
		return {
			toasts: [],
		};
	},
	created() {
		this.$root.application = this;
	},
	props: ["initialPage", "resolveComponent", "transformProps"],
	components: {
		InertiaApp,
		Toast,
	},
};
</script>

<style lang="scss">
@import "../sass/application/app.scss";
</style>
