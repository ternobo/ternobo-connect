<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer title="ثبت / ویرایش ایمیل" body-class="modal-signup" size="md" :centered="true">
		<div class="d-flex ephone-input-group py-0 justify-content-between align-items-center">
			<input type="email" class="form-control mx-1 text-input" dir="ltr" :readonly="verification_step" @keypress.enter="sendVcode()" v-model="email" placeholder="example@ternobo.com" />
			<LoadingButton class="btn signup-save-btn btn-primary" :disabled="verification_step || email.length < 1 || notChanged" :loading="loading && !verification_step" @click.native="sendVcode()">ثبت</LoadingButton>
		</div>
		<transition name="slide">
			<div v-if="verification_step">
				<label class="ml-1 mt-2 text-left clickable" @click="verification_step = false">ایمیل اشتباه است؟</label>

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
			const $this = this;
			var data = new FormData();
			data.append("email", this.email);

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
					console.log(error);
					this.loading = false;
				});
		},
		verifyCode() {
			this.loading = true;
			var data = new FormData();
			data.append("code", this.code);

			var config = {
				method: "post",
				url: this.$APP_URL + "/settings/verify-email",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:show", false);
						this.$emit("updated", this.email);
						this.verification_step = false;
					} else {
						this.toast("کد تایید نامعتبر است");
					}
					this.loading = false;
				})
				.catch((error) => {
					this.loading = false;
				});
		},
		onShow() {
			if (this.value != null) {
				this.email = this.value;
			}
		},
	},
	computed: {
		notChanged() {
			return this.email == this.value;
		},
	},
	props: {
		value: {
			default: null,
		},
	},

	data() {
		return {
			loading: false,
			code: null,
			verification_step: false,
			email: "",
		};
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		OtpInput,
	},
	mixins: [ModalMixin],
	name: "EmailModal",
};
</script>

<style>
</style>
