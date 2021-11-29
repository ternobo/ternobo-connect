<template>
	<div>
		<ResetPasswordModal :show.sync="resetpass" @back="(resetpass = false), (showModal = true)"></ResetPasswordModal>
		<b-modal @hide="onHide" v-model="showModal" hide-footer :title="__.get('application.login')" no-stacking :centered="true">
			<div v-if="loginStep">
				<div class="d-flex flex-column">
					<input type="text" v-model="username" class="form-control mb-4 text-input" :placeholder="__.get('application.username')" />
					<input type="password" v-model="password" class="form-control text-input" :placeholder="__.get('application.password')" />
				</div>
				<div class="mt-7">
					<loading-button @click.native="login" :loading="loading" class="btn btn-primary w-100">{{ __.get("application.login") }}</loading-button>
				</div>
			</div>
			<div v-else>
				<div class="d-flex flex-column align-items-center">
					<otp-input input-class="w-100" class="material--sm mb-4 text-center" @completed="verifyCode" v-model="code" :numInputs="6" v-if="!recovery" />
					<small class="text-muted clickable" @click="recovery = true" v-if="!recovery">{{ __.get("landing.use_recovery_code") }}</small>

					<input class="form-control mb-4 text-input" :placeholder="__.get('landing.enter_recover_code')" v-model="code" maxlength="8" v-if="recovery" />
					<small class="text-muted clickable" @click="recovery = false" v-if="recovery">{{ __.get("landing.use_auth_code") }}</small>
				</div>
				<div class="mt-7">
					<loading-button @click.native="verifyCode" :loading="loading" class="btn btn-primary w-100">{{ __.get("application.login") }}</loading-button>
				</div>
			</div>
		</b-modal>
	</div>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import OtpInput from "../OtpInput/OtpInput.vue";
import ResetPasswordModal from "./ResetPasswordModal";

export default {
	data() {
		return {
			password: undefined,
			username: undefined,
			resetpass: false,
			loading: false,
			loginStep: true,
			verifyStep: false,

			recovery: false,

			code: null,
			verifyText: "کد نمایان شده در اپلیکیشن تایید هویت را اینجا وارد کنید",
		};
	},
	methods: {
		onHide() {
			this.password = undefined;
			this.username = undefined;
			this.VerifyStep = false;
			this.loginStep = true;
			this.resetpass = false;
			this.recovery = false;
			this.code = null;
		},
		verifyCode() {
			if (this.code != null) {
				this.loading = true;
				let data = {
					code: this.code,
				};
				if (this.recovery) {
					data.type = "recovery";
				}

				axios
					.post("/auth/verify-tfa", data)
					.then((response) => {
						if (response.data.result) {
							window.location.reload();
						} else {
							this.toast(__.get("messages.invalid-code"));
						}
					})
					.catch((error) => {
						console.log(error);
						this.toast(__.get("messages.connection-error"));
					})
					.then(() => (this.loading = false));
			}
		},
		login() {
			if (this.username !== undefined && this.username !== "" && this.password !== undefined && this.password !== "") {
				this.loading = true;
				var data = new FormData();
				data.append("username", this.username);
				data.append("password", this.password);

				var config = {
					method: "post",
					url: this.$APP_URL + "/auth/login",
					data: data,
				};

				axios(config)
					.then((response) => {
						if (response.data.result) {
							window.location.reload();
						} else if (response.data.two_factor) {
							$this.loginStep = false;
							$this.VerifyStep = true;
							if (response.data.type == "email") {
								$this.verifyText = "کد ارسال شده با ایمیل خود را وارد کنید";
							} else if (response.data.type == "phone") {
								$this.verifyText = "کد ارسال شده با تلفن‌ خود را وارد کنید";
							}
						} else {
							const errors = response.data.errors;
							this.handleError(errors);
						}
					})
					.catch((error) => {
						console.log(error);
						this.toast(__.get("messages.connection-error"));
					})
					.then(() => (this.loading = false));
			}
		},
	},

	mixins: [ModalMixin],
	components: {
		ResetPasswordModal,
		OtpInput,
	},
	name: "LoginModal",
};
</script>

<style></style>
