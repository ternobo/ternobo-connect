<template>
	<div>
		<transition name="fade">
			<WireApp v-bind="$props"></WireApp>
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
import WireApp from "wire-js";
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
	props: ["initialData", "resolveComponent", "initialComponent"],
	components: {
		WireApp,
		Toast,
	},
};
</script>
