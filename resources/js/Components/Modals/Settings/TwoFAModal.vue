<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer title="تایید دو مرحله‌ای" size="md" :centered="true">
		<div class="d-flex flex-column">
			<div class="d-flex align-items-center mb-4" v-if="!enabled || isSetuped">
				<strong class="ml-4"> این ویژگی برای شما {{ enabled ? "فعال" : "غیرفعال" }} است. </strong>
				<span class="clickable text-action" @click="action">
					{{ enabled ? "غیرفعال کردن" : "فعال کردن" }}
				</span>
			</div>
			<div v-if="select_step">
				<div class="d-flex mb-4 justify-content-between flex-wrap align-items-end">
					<div class="d-flex flex-column">
						<strong class="mb-3" v-if="enabled">یک روش تاییده انتخاب کنید</strong>
						<tselect
							style="min-width: 250px"
							class="tselect-lg me-3"
							labelOption="label"
							valueOption="id"
							:dir="appDirection"
							v-model="type"
							:disabled="!enabled"
							:items="[
								{
									id: 'app',
									label: 'اپلیکیشن تایید هویت',
								},
								{
									id: 'phone',
									label: 'تلفن همراه',
								},
							]"
							>روش تایید</tselect
						>
					</div>

					<div class="d-flex mt-sm-0 mt-3" style="height: min-content">
						<button :disabled="!enabled" @click="enabled = false" class="btn text-muted button-transparent">لغو</button>
						<button @click="next" :disabled="!canNext" class="btn btn-dark">ادامه</button>
					</div>
				</div>
				<div v-if="noPhone && type != null && type.id == 'phone'">
					<strong class="text-danger"> برای استفاده از این ویژگی بایستی تلفن همراه خود را به اطلاعات حساب اضافه کنید </strong>
					<p class="mt-3">با افزودن شماره همراه خودتان یک لایه امنیتی جهت ورود به حساب کاربری شما اضافه می‌شود که هربار جهت ورود به حساب کاربری یک تایید برای شما ارسال می‌کنیم. البته شما می‌توانید تعیین کنید که از شماره همراه به چه منظور استفاده کنید.</p>
				</div>
				<div v-else-if="noEmail && type != null && type.id == 'email'">
					<strong class="text-danger"> برای استفاده از این ویژگی بایستی ایمیل خود را به اطلاعات حساب اضافه کنید </strong>
					<p class="mt-3">با افزودن ایمیل خودتان یک لایه امنیتی جهت ورود به حساب کاربری شما اضافه می‌شود که هربار جهت ورود به حساب کاربری یک تایید برای شما ارسال می‌کنیم. البته شما می‌توانید تعیین کنید که از ایمیل به چه منظور استفاده کنید.</p>
				</div>
			</div>
			<div v-else>
				<component :is="theComponent" v-if="setup_step" @enabled="onEnabled" @cancel="cancel" v-bind="attributes"></component>
				<div v-else-if="isSetuped">
					<div class="d-flex flex-column">
						<div class="py-3">
							<div class="d-flex">
								<div class="ml-4 font-demibold font-14 rounded-pill">تایید هویت دو مرحله‌ای با استفاده از {{ type.name }}</div>
								<span class="clickable text-action" @click="changeType">تغییر روش</span>
							</div>
							<span class="text-muted font-14 mt-3" v-if="type != null && type.id === 'app'">حین ورود، از کد‌ یکبار مصرفی که {{ type.name }} به شما نشان می‌دهد استفاده کنید.</span>
							<div class="text-muted font-14 mt-3" v-else-if="type != null && type.id == 'phone'">
								<p class="text-right">در هنگام ورود، کد یکبار مصرفی به تلفن همراه شما ارسال می‌شود.</p>
								<div class="text-dark mt-2 font-20 font-demibold">{{ phone }}</div>
							</div>
							<div class="text-muted font-14 mt-3" v-else-if="type != null && type.id == 'email'">
								<p class="text-right">در هنگام ورود، کد یکبار مصرفی به ایمیل شما ارسال می‌شود.</p>
								<div class="text-dark mt-2 font-20 font-demibold">{{ email }}</div>
							</div>
						</div>
						<div class="pt-2">
							<h3 class="mb-3 font-16">کد‌های بازیابی</h3>

							<p class="mb-4">اگر به هر دلیل نتوانستید به تلفن‌همراه خود برای دریافت پیامک یا اپلیکیشن تایید هویت دسترسی پیدا کنید می‌توانید برای ورد به حساب از کد‌های زیر استفاده کنید.</p>

							<div class="w-100 d-flex justify-content-between align-items-center mb-3">
								<span class="font-14">برای کپی کردن کلیک کنید</span>

								<div class="d-flex align-items-center">
									<i class="material-icons-outlined text-muted hover-dark me-3 clickable" @click="downloadCodes">get_app</i>
									<i class="material-icons-outlined text-muted hover-dark clickable" :class="{ rotateAnimation: resetLoading }" @click="resetCodes">loop</i>
								</div>
							</div>
							<div class="row">
								<div class="col mb-3" v-for="recoveryCode in recoveryCodes" :key="'recovery_' + recoveryCode">
									<div class="category-badge font-16 font-demibold clickable" v-clipboard="JSON.stringify(recoveryCode)" style="border-radius: 12px">
										{{ recoveryCode }}
									</div>
								</div>
							</div>

							<div class="w-100 text-right mt-3 mb-1">
								<strong>حتما این اطلاعات را در جای امنی نگه دارید</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<span class="text-grey mt-2"> با فعال کردن این ویژگی تمامی دستگاه‌های متصل به این حساب به صورت خودکار خارج می‌شوند. با اولین ورود هر دستگاه، یک تایید جهت ورود از شما درخواست می‌شود. </span>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import Tselect from "../../Tselect.vue";

export default {
	props: {
		email: {
			default: null,
		},
		phone: {
			default: null,
		},
	},
	computed: {
		theComponent() {
			// else if (this.type.id == "email") {
			// 		// return () => import("../../Settings/TwoFA/Email");
			// 	}
			if (this.type != null) {
				if (this.type.id == "app") {
					return () => import("../../Settings/TwoFA/GoogleAuth");
				} else if (this.type.id == "phone") {
					return () => import("../../Settings/TwoFA/PhoneNumber");
				}
			}
			return null;
		},
		noPhone() {
			return this.phone == null;
		},
		noEmail() {
			return this.email == null;
		},
		canNext() {
			if (this.type != null && this.enabled) {
				if (this.type.id == "phone") {
					return !this.noPhone;
				} else if (this.type.id == "email") {
					return !this.noEmail;
				}
				return true;
			}
			return false;
		},
		attributes() {
			if (this.type != null) {
				if (this.type.id == "phone") {
					return {
						phone: this.phone,
					};
				} else if (this.type.id == "email") {
					return {
						email: this.email,
					};
				}
			}
		},
	},
	data() {
		return {
			enabled: false,
			QrCode: null,
			recoveryCodes: [],
			type: undefined,

			isSetuped: false,

			select_step: true,
			setup_step: false,

			resetLoading: false,
		};
	},
	methods: {
		onShow() {
			axios.post("/two-factor-auth/info").then((response) => {
				const data = response.data;
				this.enabled = data.enabled;
				this.isSetuped = data.enabled;
				if (data.enabled) {
					this.select_step = false;
					this.setup_step = false;
				}

				if (data.enabled) {
					let name = "";
					if (data.type === "app") {
						name = "اپلیکیشن تایید هویت";
					} else if (data.type === "phone") {
						name = "تلفن همراه";
					} else if (data.type === "email") {
						name = "ایمیل";
					}
					this.type = {
						name: name,
						id: data.type,
					};
					this.recoveryCodes = JSON.parse(data.recovery_codes);
				}
			});
		},
		action() {
			this.enabled = !this.enabled;
			if (!this.enabled) {
				axios.post("/two-factor-auth/deactive");
				this.cancel();
			}
		},
		downloadCodes() {
			var csvStr = this.recoveryCodes.join("\n");
			var hiddenElement = document.createElement("a");
			hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csvStr);
			hiddenElement.target = "_blank";
			hiddenElement.download = "Ternobo-Recovery-Codes.csv";
			hiddenElement.click();
		},
		cancel() {
			this.enabled = false;
			this.isSetuped = false;
			this.setup_step = false;
			this.select_step = true;
			this.type = null;
		},
		resetCodes() {
			this.resetLoading = true;
			axios
				.post("/two-factor-auth/reset")
				.then((response) => {
					this.recoveryCodes = JSON.parse(response.data.codes);
					this.resetLoading = false;
				})
				.catch((err) => {
					this.toast("خطا در برقراری ارتباط");
					this.resetLoading = false;
				});
		},
		changeType() {
			this.select_step = true;
			this.isSetuped = false;
		},
		next() {
			if (this.type != null) {
				this.isSetuped = false;
				this.select_step = false;
				this.setup_step = true;
			} else {
				this.toast("یک شیوه تایید هویت را انتخاب کنید");
			}
		},
		onEnabled(codes) {
			this.recoveryCodes = codes;
			this.setup_step = false;
			this.enabled = true;
			this.isSetuped = true;
		},
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		Tselect,
	},
	mixins: [ModalMixin],
	name: "TwoFAModal",
};
</script>

<style></style>
