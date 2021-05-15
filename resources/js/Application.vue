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
		<!-- <widget-container v-if="this.url != '/' && this.url != '/chats' && this.user != null && $root.isDesktop"></widget-container> -->
	</div>
</template>

<script>
import WireApp from "ternobowire-js";
import Toast from "./Components/Toast";

import { v4 as uuidv4 } from "uuid";
import WidgetContainer from "./Components/ChatWidget/WidgetContainer.vue";
import { mapState } from "vuex";
import EmojiPicker from "./Components/EmojiPicker/EmojiPicker.vue";
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
			hasUser: false,
		};
	},
	computed: {
		...mapState(["url", "user"]),
	},
	created() {
		this.$root.application = this;
	},
	props: ["dataToken", "resolveComponent"],
	components: {
		WireApp,
		Toast,
		WidgetContainer,
		EmojiPicker,
	},
};
</script>

