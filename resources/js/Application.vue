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

		<upload-widget :progress="uploadProgress" />

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
import UploadWidget from "./Components/UploadWidget/UploadWidget.vue";
export default {
	methods: {
		backgroundUpload(config) {
			this.uploading = true;
			const axiosInstance = axios.create({
				"content-type:": "multipart/form-data",
				onUploadProgress: (progressEvent) => {
					let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
					this.uploadProgress = percentCompleted;
				},
			});

			axiosInstance.interceptors.response.use(
				(response) => {
					this.uploading = false;
					return response;
				},
				(error) => {
					this.uploading = false;
					console.log(error);
					return Promise.reject(error);
				}
			);

			return axiosInstance(config);
		},
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

			uploading: false,
			uploadProgress: 0,
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
		UploadWidget,
	},
};
</script>

