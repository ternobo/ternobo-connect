<template>
	<div class="register-page">
		<div class="register-header">
			<loading-button :loading="loading" :disabled="disabled" class="btn btn-primary" @click.native="next">بعدی</loading-button>
			<img src="/images/logo.svg" />
		</div>
		<div class="register-content">
			<div class="register-steps">
				<div class="invite-step" v-if="step == 0">
					<strong class="font-24">{{ __.get("register.welcom") }}</strong>
					<span class="text-muted font-20">{{ __.get("register.invited-by", { fname: user.first_name }) }}</span>
					<lazy-image :src="user.profile" imgClass="profile-xlg" class="profile-xlg" />
					<strong class="font-20">{{ user.name }}</strong>
					<img class="mt-0" src="/images/invite_illustration_ternobo.svg" height="520" />
				</div>
				<div class="invite-step" v-else-if="step == 1">
					<div class="register-card">
						<div class="register-step-title">{{ __.get("settings.phone-number") }}</div>
						<div class="input-group ephone-input-group d-flex align-items-center" @keydown.enter="sendVcode()">
							<i class="material-icons-outlined text-superlight hover-danger" v-if="verification_step" @click="(phone_step = true), (verification_step = false)">edit</i>
							<input dir="ltr" type="tel" class="form-control mx-1 text-left" :readonly="verification_step" v-model="phone_number" placeholder="09123456789" />
						</div>
						<transition name="slide">
							<div class="text-center" v-if="verification_step">
								<div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
									<label class="w-100" v-html="__.get('register.enter-verification-code')"></label>
									<div class="d-flex justify-content-center">
										<div class="d-flex align-items-center">
											<otp-input input-class="w-100" class="material--sm mx-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
											<i class="material-icons-outlined ms-4" :class="{ 'text-muted': !invalidCode && !completedCode, 'text-danger': invalidCode, 'text-success': !invalidCode }">verified_user</i>
										</div>
									</div>
								</div>
							</div>
						</transition>
					</div>
				</div>
				<div class="invite-step" v-else-if="step == 2">
					<div class="register-card">
						<div class="register-step-title">{{ __.get("application.further-information") }}</div>
						<material-text-field input-class="w-100" required class="material--sm mb-3" v-model="first_name" placeholder="نام" />
						<material-text-field input-class="w-100" required class="material--sm mb-3" v-model="last_name" placeholder="نام خانوادگی" />
						<material-text-field input-class="w-100" required class="material--sm mb-3" v-model="username" placeholder="نام کاربری" />
						<tselect
							class="tselect-lg"
							labelOption="label"
							valueOption="code"
							:items="[
								{ label: __.get('application.female'), code: '1' },
								{ label: __.get('application.male'), code: '2' },
							]"
							v-model="gender"
							:dir="appDirection"
						>
							{{ __.get("application.gender") }}
						</tselect>
					</div>
				</div>
				<div class="invite-step" v-else-if="step == 3">
					<div class="register-card">
						<div class="register-step-title">{{ __.get("application.further-information") }}</div>
						<div class="text-center">
							<material-text-field input-class="w-100" class="material--sm mb-3 w-100" v-model="password" type="password" placeholder="رمزعبور" />
							<material-text-field input-class="w-100" class="material--sm mb-3 w-100" v-model="password_repeat" type="password" placeholder="تکرار رمزعبور" />
							<div class="password-tips">
								<p class="font-18 pr-3">{{ __.get("application.security-tips") }}</p>
								<ul style="list-style: none" class="font-14 pr-3">
									<li>{{ __.get("register.password-tip-1") }}</li>
									<li>{{ __.get("register.password-tip-2") }}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="invite-step" v-else-if="step == 4">
					<div class="register-card">
						<div class="register-step-title">{{ __.get("register.profile-image") }}</div>
						<div class="d-flex flex-column align-items-center">
							<profile-image @updated="updateProfile" ref="profileelem" :canChange="true" size="profile-register" class="m-0" :src="'/images/man-profile.png'"></profile-image>
							<button class="btn upload-profile-btn" @click="$refs['profileelem'].$el.click()">
								<i class="material-icons-outlined">cloud_upload</i>
								{{ __.get("application.upload") }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import OtpInput from "../Components/OtpInput/OtpInput.vue";
import ProfileImage from "../Components/Profile/ProfileImage.vue";
export default {
	components: { OtpInput, ProfileImage },
	computed: {
		disabled() {
			let status = false;
			switch (this.step) {
				case 1:
					if (this.verification_step) {
						status = this.code.length < 6;
					} else {
						status = this.phone_number.length < 11;
					}
					break;
				case 2:
					status = !(this.first_name.length > 0 && this.last_name.length > 0 && this.username.length > 0 && this.gender != undefined);
					break;
				case 3:
					status = !(this.password == this.password_repeat && this.password.length >= 8);
					break;
			}
			return status;
		},
	},
	methods: {
		next() {
			switch (this.step) {
				case 0:
					this.step = 1;
					break;
				case 1:
					if (this.verification_step) {
						this.verifyCode();
					} else {
						this.sendVcode();
					}
					break;
				case 2:
					this.savePersonal();
					break;
				case 3:
					this.savePassword();
					break;
				case 4:
					this.$store.state.ternoboWireApp.visit("/follow-people");
					break;
			}
		},
		updateProfile() {
			this.step = 5;
		},
		sendVcode(type) {
			this.loading = true;
			const $this = this;
			var data = new FormData();
			if (type === "email") {
				data.append("email", this.email);
			} else {
				data.append("phone", this.phone_number);
			}

			var config = {
				method: "post",
				url: "/auth/verification",
				data: data,
			};

			axios(config)
				.then(function (response) {
					if (response.data.result) {
						$this.phone_step = false;
						$this.verification_step = true;
					} else {
						const errors = response.data.errors;
						$this.handleError(errors);
					}
					$this.loading = false;
				})
				.catch(function (error) {
					$this.loading = false;
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
						this.step = 3;
						this.invalidCode = false;
					} else {
						this.invalidCode = true;
					}
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.loading = false;
				})
				.then(() => {
					this.loading = false;
					this.step = 2;
				});
		},
		savePersonal() {
			this.loading = true;
			var $this = this;
			var data = new FormData();
			if (this.first_name !== undefined && this.first_name !== "") {
				data.append("firstname", this.first_name);
			}
			if (this.last_name !== undefined && this.last_name !== "") {
				data.append("lastname", this.last_name);
			}
			if (this.username !== undefined && this.username !== "") {
				data.append("username", this.username);
			}
			if (this.gender !== undefined) {
				data.append("gender", this.gender.code);
			}

			var config = {
				method: "post",
				url: "/auth/signup",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.step = 3;
					} else {
						const errors = response.data.errors;
						this.handleError(errors);
					}
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.loading = false;
				})
				.then(() => (this.loading = false));
		},
		savePassword() {
			var $this = this;
			var data = new FormData();
			if (this.password === this.password_repeat) {
				this.loading = true;

				data.append("password", this.password);
				var config = {
					method: "post",
					url: "/auth/setpassword",
					data: data,
				};

				axios(config)
					.then(function (response) {
						if (response.data.result) {
							window.location = "/follow-people";
						} else {
							const errors = response.data.errors;
							$this.handleError(errors);
						}
						$this.loading = false;
					})
					.catch(function (error) {
						$this.loading = false;
					});
			} else {
				this.toast(__.get("register.password-not-confirm-match"));
			}
		},
	},
	data() {
		return {
			step: 0,

			phone_step: true,
			verification_step: false,
			personal_info_step: false,
			profile_step: false,
			password_step: false,
			phone_number: "",
			code: "",
			first_name: "",
			last_name: "",
			username: "",
			gender: undefined,
			password: "",
			password_repeat: "",
			profile: "/images/man-profile.png",
			loading: false,

			invalidCode: false,
			completedCode: false,
		};
	},
	props: ["user"],
};
</script>

<style>
</style>