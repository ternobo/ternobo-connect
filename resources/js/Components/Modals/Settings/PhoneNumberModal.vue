<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer title="ویرایش تلفن همراه" body-class="modal-signup" size="md" :centered="true">
		<div class="d-flex ephone-input-group py-0 justify-content-between align-items-center">
			<input type="email" class="form-control mx-1 text-input" dir="ltr" :readonly="verification_step" @keypress.enter="sendVcode()" v-model="phone" placeholder="09123456789" />
			<LoadingButton class="btn signup-save-btn btn-primary" :disabled="verification_step || phone.length < 1 || notChanged" :loading="loading && !verification_step" @click.native="sendVcode()">ثبت</LoadingButton>
		</div>
		<transition name="slide">
			<div v-if="verification_step" class="text">
				<label class="me-1 mt-2 text-left clickable" @click="verification_step = false">شماره همراه اشتباه است؟</label>

				<div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
					<label class="w-100">کد تایید خود ‌را وارد کنید</label>
					<div class="d-flex align-items-center">
						<otp-input input-class="w-100" class="material--sm mx-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
						<i class="material-icons-outlined">verified_user</i>
					</div>
				</div>
				<div class="d-flex justify-content-end">
					<LoadingButton :loading="loading" class="btn btn-primary mx-3 mt-4" @click.native="verifyCode">بعدی</LoadingButton>
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
export default {
	methods: {
		sendVcode() {
			this.loading = true;
			var data = new FormData();
			data.append("phone", this.phone);

			var config = {
				method: "post",
				url: this.$APP_URL + "/auth/verification",
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
				url: this.$APP_URL + "/auth/verify-phone",
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
	},
	mixins: [ModalMixin],
	name: "PhoneNumberModal",
};
</script>

<style></style>
