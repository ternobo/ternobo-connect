<template>
	<div class="forgot-password-container">
		<div class="d-flex align-items-center mb-7">
			<i class="material-icons-outlined clickable me-3" :class="{ 'rotate-180': appDirection == 'rtl' }" v-if="step <= 1" @click="back">arrow_back</i>
			<strong class="font-20">{{ __.get("landing.forgot_password_title") }}</strong>
		</div>
		<div>
			<div v-if="step == 0">
				<label class="mb-3 font-12 font-demibold">{{ __.get("application.username") }} <span class="text-superlight"> / </span>{{ __.get("validation.attributes.phone_number") }}</label>
				<input type="text" class="form-control fill-light lg-input" v-model="input" />
			</div>
			<div class="d-flex flex-column align-items-center" v-else-if="step == 1">
				<div class="d-flex align-items-center">
					<otp-input input-class="w-100" class="text-center" @completed="checkCode" v-model="resetCode" :numInputs="6" />
				</div>
				<div class="mt-7" style="width: 160px">
					<span
						class="clickable d-flex justify-content-between align-items-center font-14"
						:class="{
							'disabled text-muted': countdown > 0,
							'text-action': !(countdown > 0),
						}"
						@click="sendResetCode"
					>
						<span>{{ __.get("settings.resend") }}</span> <span class="text-dark">{{ countdown > 0 ? "00:" + countdown : "" }}</span>
					</span>
				</div>
			</div>
			<div v-else-if="step == 2">
				<div>
					<label class="mb-3 font-12 font-demibold">{{ __.get("application.password") }}</label>
					<input type="password" class="form-control fill-light lg-input" v-model="password" />
				</div>
				<div class="mt-4">
					<label class="mb-3 font-12 font-demibold">{{ __.get("settings.confirm-password") }}</label>
					<div class="input-group-icon w-100">
						<input :type="showpassword ? 'text' : 'password'" v-model="password1" class="form-control fill-light lg-input" />
						<i class="material-icons-outlined clickable text-muted" @click="showpassword = !showpassword">visibility{{ showpassword ? "_off" : "" }}</i>
					</div>
				</div>
			</div>
			<div class="login-button-container" style="margin-bottom: -24px">
				<loading-button class="btn btn-primary" :loading="loading" @click.native="action">{{ actionText }}</loading-button>
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
	computed: {
		actionText() {
			if (this.step == 2) {
				return __.get("application.submit");
			}
			return __.get("application.next");
		},
	},
	data() {
		return {
			step: 0,

			input: undefined,
			loading: false,

			resetCode: undefined,
			password: undefined,
			password1: undefined,

			showpassword: false,
		};
	},
	methods: {
		action() {
			switch (this.step) {
				case 0:
					this.sendResetCode();
					break;
				case 1:
					this.checkCode();
					break;
				case 2:
					this.changePassord();
					break;
			}
		},
		sendResetCode() {
			this.loading = true;
			axios
				.post("/rest-password", {
					input: this.input,
				})
				.then((response) => {
					const data = response.data;
					if (data !== false) {
						if (data.result) {
							this.toast(data.msg, "check", "text-success");
							this.countdown = 30;
							this.countDownTimer();
							this.step = 1;
						} else {
							this.handleError(data.errors);
						}
					} else {
						this.toast(__.get("messages.all-inputs-required"));
					}
				})
				.then(() => (this.loading = false));
		},
		checkCode() {
			this.loading = true;
			axios
				.post("/passowrd-reset-verification", {
					code: this.resetCode,
				})
				.then((response) => {
					if (response.data.result) {
						this.step++;
					} else {
						this.toast(__.get("messages.invalid-code"));
					}
				})
				.catch((err) => {
					console.log(err);
					this.toast(__.get("messages.connection-error"));
				})
				.then(() => {
					this.loading = false;
				});
		},
		changePassord() {
			if (this.password1 == this.password) {
				this.loading = true;
				axios
					.post("updatepassword", {
						newpassword: this.password,
						code: this.resetCode,
					})
					.then((response) => {
						const data = response.data;
						if (data !== false) {
							if (data.result) {
								window.location = "/feed";
							} else {
								this.handleError(data.errors);
							}
						} else {
							this.toast(__.get("messages.all-inputs-required"));
						}
					})
					.then(() => (this.loading = false));
			} else {
				this.toast(__.get("register.password-not-confirm-match"), "cancel", "material-icons-outlined text-danger");
			}
		},
		back() {
			if (this.step == 0) {
				this.$emit("back");
			} else {
				this.step--;
			}
		},
	},
};
</script>

<style>
</style>