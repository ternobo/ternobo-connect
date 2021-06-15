<template>
	<div class="login-page">
		<login-header></login-header>
		<div class="login-content">
			<div class="about-ternobo" v-if="$root.isDesktop">
				<h1 class="font-20">{{ __.get("landing.welcome") }}</h1>
				<p>
					{{ __.get("landing.about-ternobo") }}
				</p>
				<img src="/images/invite_illustration_ternobo.svg" />
			</div>
			<div class="login-form">
				<div class="login-form w-100">
					<div class="login-card card w-100">
						<div class="card-body">
							<div v-if="!forgotpassword">
								<label class="font-weight-bold font-20 mb-5 text-dark">{{ __.get("application.login") }}</label>
								<div v-if="verifyStep">
									<label class="mb-2">{{ __.get("landing.auth_app_text") }}</label>
									<div class="text-start d-flex flex-column align-items-center">
										<otp-input input-class="w-100" class="material--sm mb-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" v-if="!recovery" />
										<small class="text-muted clickable" @click="recovery = true" v-if="!recovery"></small>

										<input class="form-control" :placeholder="__.get('landing.enter_recover_code')" v-model="code" maxlength="8" v-if="recovery" />
										<small class="text-muted clickable" @click="recovery = false" v-if="recovery">{{ __.get("landing.user_recovery_code") }}</small>
									</div>
									<div class="login-button-container">
										<loading-button :loading="loading" class="btn btn-primary" @click.native="verifyCode">{{ __.get("application.login") }}</loading-button>
									</div>
								</div>
								<div v-else>
									<div>
										<div>
											<label class="mb-2 font-demibold">{{ __.get("application.username") }}<span class="text-muted"> / </span>{{ __.get("validation.attributes.email") }}</label>
											<input type="text" v-model="username" class="text-input-light" />
										</div>
										<div class="mt-3">
											<label class="mb-2 font-demibold">{{ __.get("application.password") }}<span class="text-muted">/</span>{{ __.get("validation.attributes.email") }}</label>
											<div class="d-flex flex-column align-items-end">
												<div class="input-group-icon w-100">
													<input :type="showpassword ? 'text' : 'password'" v-model="password" class="text-input-light" />
													<i class="material-icons-outlined clickable text-muted" @click="showpassword = !showpassword">visibility{{ showpassword ? "_off" : "" }}</i>
												</div>
												<small class="clickable hover-dark font-12 mt-2" @click="forgotpassword = true">{{ __.get("landing.forgot_password") }}</small>
											</div>
										</div>
										<div class="login-button-container">
											<loading-button :loading="loading" class="btn btn-primary" @click.native="login">{{ __.get("application.login") }}</loading-button>
										</div>
									</div>
									<div class="d-flex">
										<img src="/images/invite_icon.svg" width="40" />
										<div class="ms-3">
											{{ __.get("landing.signup-description") }}
										</div>
									</div>
								</div>
							</div>
							<forgot-password v-else @back="forgotpassword = false" />
						</div>
					</div>
				</div>
				<div class="w-100 text-center">
					<div class="copyright-text d-flex align-items-center justify-content-center" style="height: 16px">
						<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="mx-1" height="16" />
						<span class="font-14" style="height: 13px; line-height: 1">© {{ lang == "fa" ? "۱۴۰۰" : "2021" }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Button from "../../../vendor/laravel/jetstream/stubs/inertia/resources/js/Jetstream/Button.vue";
import ForgotPassword from "../Components/App/ForgotPassword.vue";
import LoginHeader from "../Components/App/LoginHeader.vue";
import OtpInput from "../Components/OtpInput/OtpInput.vue";
export default {
	data() {
		return {
			lang: "en",
			forgotpassword: false,
			showpassword: false,

			loading: false,
			username: "",
			password: "",
			verifyStep: false,
			recovery: false,
			code: null,
		};
	},
	methods: {
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
							window.location = "/feed";
						} else {
							this.toast(__.get("messages.invalid-code"));
						}
						this.loading = false;
					})
					.catch((err) => (this.loading = true));
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
							window.location = "/feed";
						} else if (response.data.two_factor) {
							this.loginStep = false;
							this.verifyStep = true;
						} else {
							const errors = response.data.errors;
							this.handleError(errors);
						}
						this.loading = false;
					})
					.catch((error) => {
						console.log(error);
						this.loading = false;
						this.toast(__.get("messages.connection-error"));
					});
			}
		},
	},
	created() {
		this.lang = window.lang;
		// random =
	},
	components: { LoginHeader, Button, ForgotPassword, OtpInput },
};
</script>