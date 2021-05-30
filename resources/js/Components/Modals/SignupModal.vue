<template>
	<b-modal v-model="showModal" hide-footer hide-header body-class="modal-signup" :centered="true">
		<tabs v-if="verification_step || emailphone_step" @selected="(emailphone_step = true), (verification_step = false)">
			<tab name="ایمیل" :selected="true">
				<div class="input-group ephone-input-group d-flex align-items-center" @keydown.enter="sendVcode('email')">
					<LoadingButton class="signup-save-btn btn btn-dark" :loading="loading" v-if="!verification_step" @click.native="sendVcode('email')">ثبت</LoadingButton>
					<i class="material-icons-outlined text-superlight hover-danger" v-else @click="(emailphone_step = true), (verification_step = false)">edit</i>
					<input dir="ltr" input-class="w-100" type="email" class="form-control mx-1 text-left" :readonly="verification_step" v-model="email" placeholder="example@ternobo.com" />
				</div>
			</tab>
			<tab name="شماره همراه">
				<div class="input-group ephone-input-group d-flex align-items-center" @keydown.enter="sendVcode('phone')">
					<LoadingButton class="signup-save-btn btn btn-dark" :loading="loading" v-if="!verification_step" @click.native="sendVcode('phone')">ثبت</LoadingButton>
					<i class="material-icons-outlined text-superlight hover-danger" v-else @click="(emailphone_step = true), (verification_step = false)">edit</i>
					<input dir="ltr" type="tel" class="form-control mx-1 text-left" :readonly="verification_step" v-model="phone_number" placeholder="09123456789" />
				</div>
			</tab>
		</tabs>
		<transition name="slide">
			<div class="text-center" v-if="verification_step">
				<div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
					<label class="w-100">کد <strong>تایید</strong> ارسال شده ‌را وارد کنید</label>
					<div class="d-flex justify-content-center">
						<div class="d-flex align-items-center">
							<otp-input input-class="w-100" class="material--sm mx-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
							<i class="material-icons-outlined ms-4" :class="{ 'text-muted': !invalidCode && !completedCode, 'text-danger': invalidCode, 'text-success': !invalidCode }">verified_user</i>
						</div>
					</div>
				</div>
				<LoadingButton :loading="loading" class="btn btn-dark mt-4" @click.native="verifyCode">بعدی</LoadingButton>
			</div>
		</transition>
		<transition name="slide">
			<div class="text-center" v-if="personal_info_step">
				<h5 class="mb-4" style="border-bottom: 2px solid #000019; width: fit-content; align-self: center; margin-top: 20px; margin: auto; padding-bottom: 10px; padding-left: 0; padding-right: 0">اطلاعات تکمیلی</h5>
				<div>
					<material-text-field input-class="w-100" class="material--sm mb-3" v-model="first_name" placeholder="نام" />
					<material-text-field input-class="w-100" class="material--sm mb-3" v-model="last_name" placeholder="نام خانوادگی" />
					<material-text-field input-class="w-100" class="material--sm mb-3" v-model="username" placeholder="نام کاربری" />
					<v-select
						class="datepicker-list"
						:placeholder="'جنسیت'"
						:dir="appDirection"
						v-model="gender"
						:options="[
							{ label: 'زن', code: '1' },
							{ label: 'مرد', code: '2' },
						]"
					>
						<template #no-options>موردی یافت نشد</template>
					</v-select>
				</div>
				<LoadingButton :loading="loading" :disabled="!(first_name.length > 0 && last_name.length > 0 && username.length > 0 && gender != undefined)" class="btn btn-dark mx-auto mt-4 signup-save-btn" @click.native="savePersonal">بعدی</LoadingButton>
			</div>
		</transition>
		<transition name="slide">
			<div class="text-center" v-if="password_step">
				<h5 class="mb-4" style="border-bottom: 2px solid #000019; margin: auto; width: fit-content; display: flex; justify-content: center; margin-top: 20px; padding-bottom: 10px; padding-left: 0; padding-right: 0">رمزعبور</h5>
				<div class="d-flex flex-column" style="align-items: center">
					<material-text-field input-class="w-100" class="material--sm w-50 mx-1 text-right" v-model="password" type="password" placeholder="رمزعبور" />
					<material-text-field input-class="w-100" class="material--sm w-50 mx-1 text-right mt-3" v-model="password_repeat" type="password" placeholder="تکرار رمزعبور" />
				</div>
				<div class="text-right mt-5 mx-auto" style="max-width: 80%">
					<p class="font-18 pr-3">نکات امنیتی</p>
					<ul style="list-style: none" class="font-14 pr-3">
						<li>رمزعبور حداقل ۸ کاراکتر باشد</li>
						<li>بهتر است که از حروف کوچک، بزرگ و سمبل‌ها در رمزعبور خود استفاده کنید.</li>
					</ul>
				</div>
				<LoadingButton :loading="loading" class="btn btn-dark mx-auto mt-4 signup-save-btn" :disabled="!(password.length > 0 && password.length)" @click.native="savePassword">بعدی</LoadingButton>
			</div>
		</transition>
		<transition name="slide">
			<div v-if="profile_step" class="d-flex flex-column align-items-center">
				<ProfileImage @updated="updateProfile" :canChange="true" class="m-0" :src="$APP_URL + '/images/man-profile.png'"></ProfileImage>
				<div class="d-flex mt-4 flex-column">
					<span class="text-center">تصویر خود را وارد کنید</span>
					<a href="/feed" class="btn btn-dark mx-auto mt-4 signup-save-btn" style="white-space: nowrap">رد شدن</a>
				</div>
			</div>
		</transition>
	</b-modal>
</template>

<script>
import ModalMixin from "../../Mixins/Modal";
import LoadingButton from "../../Components/buttons/LoadingButton";
import ProfileImage from "../../Components/Profile/ProfileImage";
import OtpInput from "../OtpInput/OtpInput.vue";

export default {
	methods: {
		updateProfile() {
			window.location = "/feed";
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
				url: this.$APP_URL + "/auth/verification",
				data: data,
			};

			axios(config)
				.then(function (response) {
					if (response.data.result) {
						$this.emailphone_step = false;
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
			const $this = this;
			var data = new FormData();
			data.append("code", this.code);

			var config = {
				method: "post",
				url: this.$APP_URL + "/auth/verifycode",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.verification_step = false;
						this.personal_info_step = true;
						this.invalidCode = false;
					} else {
						this.invalidCode = true;
					}
					this.loading = false;
				})
				.catch(function (error) {
					$this.loading = false;
				})
				.then(() => (this.completedCode = true));
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
				url: this.$APP_URL + "/auth/signup",
				data: data,
			};

			axios(config)
				.then(function (response) {
					if (response.data.result) {
						$this.personal_info_step = false;
						$this.password_step = true;
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
		savePassword() {
			var $this = this;
			var data = new FormData();
			if (this.password === this.password_repeat) {
				this.loading = true;

				data.append("password", this.password);
				var config = {
					method: "post",
					url: this.$APP_URL + "/auth/setpassword",
					data: data,
				};

				axios(config)
					.then(function (response) {
						if (response.data.result) {
							$this.password_step = false;
							$this.profile_step = true;
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
				this.toast("رمزعبور و تاییدیه آن برابر نیست");
			}
		},
	},
	data() {
		return {
			emailphone_step: true,
			verification_step: false,
			personal_info_step: false,
			profile_step: false,
			password_step: false,
			phone_number: undefined,
			email: undefined,
			code: undefined,
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
	mixins: [ModalMixin],
	name: "SignupModal",
	components: {
		LoadingButton,
		ProfileImage,
		OtpInput,
	},
};
</script>

<style></style>
