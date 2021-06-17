<template>
	<div class="login-form">
		<div class="login-form w-100">
			<div class="login-card card w-100">
				<div class="card-body">
					<div class="d-flex align-items-center mb-5">
						<i class="material-icons-outlined clickable me-12px text-grey" :class="{ 'rotate-180': appDirection == 'rtl' }" v-if="verification_step" @click="verification_step = false">arrow_back</i>
						<label class="font-weight-bold mb-0 font-20 text-dark">{{ title }}</label>
					</div>
					<div>
						<input class="text-input-light text-input--md" :readonly="verification_step" v-model="phone" />
					</div>
					<div class="d-flex flex-column align-items-center mt-4" v-if="verification_step">
						<div class="d-flex align-items-center">
							<otp-input input-class="w-100" class="mx-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
						</div>
						<div class="mt-32px" style="width: 160px">
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
					<div class="login-button-container w-100 h-auto">
						<loading-button :loading="loading" class="btn btn-primary w-100" @click.native="sendVcode">{{ __.get("application.next") }}</loading-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CountDownMixin from "../../Mixins/CountDownMixin";
import OtpInput from "../OtpInput/OtpInput.vue";
export default {
	components: { OtpInput },
	mixins: [CountDownMixin],
	data() {
		return {
			phone: "",
			loading: false,
			verification_step: false,
			phone_step: true,
			code: "",
		};
	},
	computed: {
		title() {
			if (this.verification_step) {
				return __.get("register.verification");
			}
			return __.get("validation.attributes.phone_number");
		},
	},
	methods: {
		sendVcode() {
			this.loading = true;
			this.countdown = 30;
			this.countDownTimer();
			var data = new FormData();
			data.append("phone", this.phone);

			var config = {
				method: "post",
				url: "/auth/verification",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.phone_step = false;
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
			this.loading = true;
			var data = new FormData();
			data.append("code", this.code);

			var config = {
				method: "post",
				url: "/auth/verifycode",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.$emit("next");
					} else {
						this.toast(__.get("messages.invalid-code"), "error", "text-danger");
					}
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.loading = false;
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	max-width: 480px;
}
</style>