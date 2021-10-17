<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer :title="__.get('settings.change-phone-number')" body-class="modal-signup" size="md" :centered="true">
		<div class="justify-content-between align-items-end">
			<phone-number-input inputClass="input-lg" v-model="phone" :readonly="verification_step" @enter="sendVcode" />
			<LoadingButton class="btn btn-lg mt-6 w-100 btn-primary" :disabled="verification_step || phone.length < 1 || notChanged" :loading="loading && !verification_step" @click.native="sendVcode()">ثبت</LoadingButton>
		</div>
		<transition name="slide">
			<div v-if="verification_step" class="text">
				<div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
					<label class="w-100" v-html="__.get('register.enter-verification-code')"></label>
					<div class="d-flex align-items-center">
						<div class="d-flex flex-column">
							<div class="d-flex align-items-end">
								<div><otp-input input-class="w-100" class="text-center" @completed="verifyCode" v-model="code" :numInputs="6" /></div>
								<i class="material-icons-outlined ms-2" :class="{ 'text-danger': invalidCode }">verified_user</i>
							</div>
							<div class="mt-3" style="width: 160px">
								<span
									class="clickable d-flex justify-content-between align-items-center font-14"
									:class="{
										'disabled text-muted': countdown > 0,
										'text-action': !(countdown > 0),
									}"
									@click="sendVcode"
								>
									<span>{{ __.get("settings.resend") }}</span> <span class="text-dark">{{ countdown > 0 ? "00:" + countdown : "" }}</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-end">
					<LoadingButton :loading="loading" class="btn btn-primary mx-3 mt-4" @click.native="verifyCode">{{ __.get("application.confirm") }}</LoadingButton>
				</div>
			</div>
		</transition>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import OtpInput from "../../OtpInput/OtpInput.vue";
import CountDownMixin from "../../../Mixins/CountDownMixin";
import PhoneNumberInput from "../../inputs/PhoneNumberInput.vue";
export default {
	methods: {
		sendVcode() {
			this.countDownTimer();
			this.loading = true;
			var data = new FormData();
			data.append("phone", this.phone);

			var config = {
				method: "post",
				url: "/settings/verification",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.verification_step = true;
					} else {
						const errors = response.data.errors;
						this.handleError(errors);
					}
					this.loading = false;
				})
				.catch((error) => {
					this.loading = false;
				});
		},
		verifyCode() {
			this.nextLoading = true;
			var data = new FormData();
			data.append("code", this.code);

			var config = {
				method: "post",
				url: "/settings/verify-phone",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:show", false);
						this.$emit("updated", this.phone);
						this.invalidCode = false;
						this.verification_step = false;
					} else {
						this.invalidCode = true;
					}
					this.nextLoading = false;
				})
				.catch((error) => {
					this.nextLoading = false;
				})
				.then(() => (this.completedCode = true));
		},
		onShow() {
			if (this.value != null) {
				this.phone = this.value;
			}
		},
	},
	props: {
		value: {
			default: null,
		},
	},

	computed: {
		notChanged() {
			return this.phone == this.value;
		},
	},
	data() {
		return {
			loading: false,
			code: null,
			verification_step: false,
			phone: "",
			nextLoading: false,

			invalidCode: false,
			completedCode: false,
		};
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		OtpInput,
		PhoneNumberInput,
	},
	mixins: [ModalMixin, CountDownMixin],
	name: "PhoneNumberModal",
};
</script>

<style></style>
