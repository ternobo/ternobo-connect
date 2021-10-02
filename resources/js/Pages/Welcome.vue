<template>
	<div class="login-page">
		<login-header></login-header>
		<div class="login-content">
			<div class="about-ternobo" v-if="$root.isDesktop">
				<h1 class="font-weight-bold mb-42px font-20">{{ __.get("landing.welcome") }}</h1>
				<p class="line-height-32px" :style="{ marginBottom: image.top }">
					{{ __.get("landing.about-ternobo") }}
				</p>
				<img class="position-absolute" :src="image.url" :width="image.width" />
			</div>
			<div class="login-form">
				<div class="login-form w-100">
					<div class="login-card card w-100">
						<div class="card-body">
							<div v-if="!forgotpassword">
								<label class="font-weight-bold font-20 mb-42px text-dark">{{ __.get("application.login") }}</label>
								<div v-if="verifyStep">
									<label class="mb-12px font-12">{{ __.get("landing.auth_app_text") }}</label>
									<div class="text-start d-flex flex-column align-items-center">
										<otp-input input-class="w-100" class="material--sm mb-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" v-if="!recovery" />
										<small class="text-muted clickable" @click="recovery = true" v-if="!recovery">{{ __.get("landing.user_recovery_code") }}</small>

										<input class="form-control" :placeholder="__.get('landing.enter_recover_code')" v-model="code" maxlength="8" v-if="recovery" />
										<small class="text-muted clickable" @click="recovery = false" v-if="recovery">{{ __.get("landing.use_auth_code") }}</small>
									</div>
									<div class="login-button-container">
										<loading-button :loading="loading" class="btn btn-primary" @click.native="verifyCode">{{ __.get("application.login") }}</loading-button>
									</div>
								</div>
								<div v-else>
									<div>
										<div>
											<label class="inputlabel font-12 font-demibold">{{ __.get("application.username") }} <span class="text-superlight"> / </span>{{ __.get("validation.attributes.phone_number") }}</label>
											<input type="text" v-model="username" class="form-control fill-light lg-input" />
										</div>
										<div class="mt-4">
											<label class="inputlabel font-12 font-demibold">{{ __.get("application.password") }}</label>
											<div class="d-flex flex-column align-items-end">
												<div class="input-group-icon w-100">
													<input :type="showpassword ? 'text' : 'password'" v-model="password" class="form-control fill-light lg-input" />
													<i class="material-icons-outlined clickable text-muted" @click="showpassword = !showpassword">visibility{{ showpassword ? "_off" : "" }}</i>
												</div>
												<small class="clickable hover-dark font-12 mt-12px" @click="forgotpassword = true">{{ __.get("landing.forgot_password") }}</small>
											</div>
										</div>
										<div class="login-button-container">
											<loading-button :loading="loading" class="btn btn-primary" @click.native="login">{{ __.get("application.login") }}</loading-button>
										</div>
									</div>
									<div class="d-flex">
										<img src="/images/invite_icon.svg" width="40" />
										<div class="ms-4 font-14">
											{{ __.get("landing.signup-description") }}
										</div>
									</div>
								</div>
							</div>
							<forgot-password v-else @back="forgotpassword = false" />
						</div>
					</div>
				</div>
				<div class="copyright-text d-flex align-items-center justify-content-center" style="height: 20px">
					<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="me-1" height="20" />
					<span class="font-14" style="height: 13px; line-height: 1">© {{ lang == "fa" ? "۱۴۰۰" : "2021" }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ForgotPassword from "../Components/App/ForgotPassword.vue";
import LoginHeader from "../Components/App/LoginHeader.vue";
import OtpInput from "../Components/OtpInput/OtpInput.vue";
import App from "../Layouts/App.vue";
export default {
	data() {
		return {
			lang: "en",
			forgotpassword: false,
			showpassword: false,

			image: {},

			loading: false,
			username: "",
			password: "",
			verifyStep: false,
			recovery: false,
			code: null,
		};
	},
	layout: App,
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
		let imageIndex = Math.floor(Math.random() * 4);
		let images = [
			{
				url: "/images/landing/dev.svg",
				width: 750,
				top: "164px",
			},
			{
				url: "/images/landing/bizz.svg",
				width: 500,
				top: "84px",
			},
			{
				url: "/images/landing/des.svg",
				width: 500,
				top: "84px",
			},
			{
				url: "/images/landing/bitcoin.svg",
				width: 500,
				top: "84px",
			},
		];
		this.image = images[imageIndex];
	},
	components: { LoginHeader, ForgotPassword, OtpInput },
};
</script>