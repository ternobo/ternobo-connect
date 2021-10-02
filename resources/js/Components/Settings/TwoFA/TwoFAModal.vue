<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer :title="modalTitle" size="md" :centered="true">
		<choose-way v-if="chooseWay" @action="setType"></choose-way>
		<google-auth v-else-if="!enabled && type == 'app'" @enabled="onEnable" :verification.sync="verification_step"></google-auth>
		<phone-number v-else-if="!enabled && type == 'phone'" @enabled="onEnable" :verification.sync="verification_step"></phone-number>
		<div v-else-if="enabled">
			<p>
				{{ __.get("settings.ts-des-10") }}
			</p>

			<div class="px-4">
				<div class="w-100 d-flex justify-content-between align-items-center mb-4">
					<span class="font-14">{{ __.get("settings.click-to-copy") }}</span>

					<div class="d-flex align-items-center">
						<i class="material-icons-outlined text-muted hover-dark me-4 clickable" @click="downloadCodes">get_app</i>
						<i class="material-icons-outlined text-muted hover-dark clickable" :class="{ rotateAnimation: resetLoading }" @click="resetCodes">loop</i>
					</div>
				</div>
				<div class="d-flex flex-wrap" style="margin: 0 -8px">
					<div class="my-3 px-2" v-for="recoveryCode in recoveryCodes" :key="'recovery_' + recoveryCode">
						<div class="category-badge font-16 px-3 text-dark font-demibold clickable" v-clipboard="JSON.stringify(recoveryCode)" style="border-radius: 12px">
							{{ recoveryCode }}
						</div>
					</div>
				</div>
			</div>

			<p class="mt-4">
				{{ __.get("settings.ts-des-11") }}
			</p>

			<button class="btn btn-transparent p-0 hover-danger mt-4" @click="deactivate"><i class="material-icons-outlined">power_settings_new</i> {{ __.get("application.deactivate") }}</button>
		</div>
		<div class="d-flex flex-column align-items-end" v-else>
			<p>
				{{ __.get("settings.ts-des-1") }}
			</p>
			<button class="btn btn-primary mt-4" @click="next">{{ __.get("application.next") }}</button>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import Tselect from "../../Tselect.vue";
import ChooseWay from "./ChooseWay.vue";
import GoogleAuth from "./GoogleAuth.vue";
import PhoneNumber from "./PhoneNumber.vue";

export default {
	props: {
		email: {
			default: null,
		},
		phone: {
			default: null,
		},
		status: {
			default: false,
		},
	},
	computed: {
		modalTitle() {
			if (this.chooseWay) {
				return __.get("settings.ts-title-2");
			} else if (this.verification_step) {
				return __.get("settings.confirmation-code");
			} else if (this.type == "app") {
				return __.get("settings.ts-title-3");
			} else if (this.type == "phone") {
				return __.get("settings.confirmation-code");
			}

			return __.get("settings.two-step-verification");
		},
		noPhone() {
			return this.phone == null;
		},
		noEmail() {
			return this.email == null;
		},
		canNext() {
			if (this.type != null && this.enabled) {
				if (this.type.id == "phone") {
					return !this.noPhone;
				} else if (this.type.id == "email") {
					return !this.noEmail;
				}
				return true;
			}
			return false;
		},
		attributes() {
			if (this.type != null) {
				if (this.type.id == "phone") {
					return {
						phone: this.phone,
					};
				} else if (this.type.id == "email") {
					return {
						email: this.email,
					};
				}
			}
		},
	},
	data() {
		return {
			enabled: false,
			chooseWay: false,
			type: null,

			QrCode: null,
			recoveryCodes: [],

			isSetuped: false,

			verification_step: false,

			resetLoading: false,
		};
	},
	methods: {
		onShow() {
			this.enabled = this.status;
			this.chooseWay = false;
			this.type = null;
			axios.post("/two-factor-auth/info").then((response) => {
				const data = response.data;
				this.enabled = data.enabled;
				this.isSetuped = data.enabled;
				if (data.enabled) {
					this.select_step = false;
					this.setup_step = false;
				}

				if (data.enabled) {
					let name = "";
					if (data.type === "app") {
						name = "اپلیکیشن تایید هویت";
					} else if (data.type === "phone") {
						name = "تلفن همراه";
					} else if (data.type === "email") {
						name = "ایمیل";
					}
					this.type = {
						name: name,
						id: data.type,
					};
					this.recoveryCodes = JSON.parse(data.recovery_codes);
				}
			});
		},
		onEnable(codes) {
			this.recoveryCodes = codes;
			this.enabled = true;
			this.$emit("update:status", true);
		},
		deactivate() {
			axios.post("/two-factor-auth/deactive");
			this.$emit("update:status", false);
			this.$emit("update:show", false);

			this.enabled = false;
			this.chooseWay = false;
			this.type = null;
		},
		downloadCodes() {
			var csvStr = this.recoveryCodes.join("\n");
			var hiddenElement = document.createElement("a");
			hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
			hiddenElement.target = "_blank";
			hiddenElement.download = "Ternobo-Recovery-Codes.csv";
			hiddenElement.click();
		},
		resetCodes() {
			this.resetLoading = true;
			axios
				.post("/two-factor-auth/reset")
				.then((response) => {
					this.recoveryCodes = JSON.parse(response.data.codes);
					this.resetLoading = false;
				})
				.catch((err) => {
					this.toast(__.get("messages.connection-error"));
					this.resetLoading = false;
				});
		},
		setType(type) {
			this.type = type;
			this.chooseWay = false;
		},
		next() {
			this.chooseWay = true;
		},
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		Tselect,
		ChooseWay,
		GoogleAuth,
		PhoneNumber,
	},
	mixins: [ModalMixin],
	name: "TwoFAModal",
};
</script>

<style></style>
