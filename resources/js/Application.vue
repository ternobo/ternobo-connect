<template>
	<div>
		<div v-if="$root.isMobile">
			<mobile-maintenance />	
		</div>
		<div v-else>
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

			<portal-target name="destination"></portal-target>

			<transition name="fade">
				<upload-widget v-if="uploading" :error="error" @reload="onReload" @cancel="uploading = false" :progress="uploadProgress" />
			</transition>

			<announcement-modal v-for="announcement in shared.announcements" :key="`announcement_key_id_${announcement.id}`" :show="true" :title="announcement.title" :text="announcement.text" :link="announcement.link" :link_text="announcement.link_text" :icon="announcement.icon" :has_confetti="true"></announcement-modal>

			<!-- <widget-container v-if="this.url != '/' && this.url != '/chats' && this.user != null && $root.isDesktop"></widget-container> -->
		</div>
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
import MobileMaintenance from "./Components/MobileMaintenance.vue";
import AnnouncementModal from "./Components/Announcement/AnnouncementModal.vue";
import { default as axioslib } from "axios";
export default {
	methods: {
		backgroundUpload(config) {
			this.uploading = true;
			this.error = false;
			this.onReload = () => {};
			const axiosInstance = axioslib.create({
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
					this.error = true;
					this.onReload = () => {
						this.backgroundUpload(config);
					};
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
			error: false,

			onReload: () => {},

			uploadProgress: 0,
		};
	},
	computed: {
		...mapState(["url", "user", "shared"]),
	},
	created() {
		this.$root.application = this;
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response && error.response.status == 422) {
					this.handleError(error.response.data.errors);
				} else if (error.response && error.response.status == 500) {
					this.toast(__.get("messages.connection-error"));
				}
				return Promise.reject(error);
			}
		);
		window.axios = axios;
	},
	props: ["dataToken", "resolveComponent"],
	components: {
		WireApp,
		Toast,
		WidgetContainer,
		EmojiPicker,
		UploadWidget,
		MobileMaintenance,
		AnnouncementModal,
	},
};
</script>

