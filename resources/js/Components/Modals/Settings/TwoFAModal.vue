<template>
	<b-modal v-model="showModal" hide-footer title="تایید دو مرحله‌ای" size="md" :centered="true">
		<div class="d-flex flex-column py-3">
			<div class="d-flex align-items-center" v-if="!enabled || isSetuped">
				<strong class="ml-4"> این ویژگی برای شما {{ enabled ? "فعال" : "غیرفعال" }} است. </strong>
				<span class="clickable text-action" @click="action">
					{{ enabled ? "غیرفعال کردن" : "فعال کردن" }}
				</span>
			</div>
			<div v-if="select_step">
				<div class="d-flex mb-4 justify-content-between flex-wrap align-items-end">
					<div class="d-flex flex-column">
						<strong class="mb-2" v-if="enabled">یک روش تاییده انتخاب کنید</strong>
						<v-select
							style="min-width: 280px"
							class="datepicker-list ml-2"
							:placeholder="'روش تاییدیه'"
							dir="rtl"
							v-model="type"
							:disabled="!enabled"
							:options="[
								{
									id: 'app',
									label: 'اپلیکیشن تایید هویت',
								},
								{
									id: 'phone',
									label: 'تلفن همراه',
								},
								{
									id: 'email',
									label: 'ایمیل',
								},
							]"
						>
							<template #no-options>موردی یافت نشد</template>
						</v-select>
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
						<div class="py-3 border-bottom">
							<div class="d-flex">
								<div class="bg-body px-2 p-1 ml-3 font-14 rounded-pill">تایید هویت دو مرحله‌ای با استفاده از {{ typeText }}</div>
								<span class="clickable text-action" @click="changeType">تغییر روش</span>
							</div>
							<span class="text-muted font-14">حین ورود، از کد‌ یکبار مصرفی که اپلیکیشن به نشان می‌دهد استفاده کنید.</span>
						</div>
						<div class="pt-3">
							<h3 class="mb-3 font-16">کد‌های بازیابی</h3>

							<p>اگر به هر دلیل نتوانستید به تلفن‌همراه خود برای دریافت پیامک یا اپلیکیشن تایید هویت دسترسی پیدا کنید می‌توانید برای ورد به حساب از کد‌های زیر استفاده کنید.</p>

							<div class="w-100 d-flex justify-content-between align-items-center mb-3">
								<span class="font-12">برای کپی کردن کلیک کنید</span>

								<div class="d-flex align-items-center">
									<i class="material-icons-outlined text-muted hover-dark clickable" @click="downloadCodes">get_app</i>
									<i class="material-icons-outlined text-muted hover-dark clickable" :class="{ rotateAnimation: resetLoading }" @click="resetCodes">loop</i>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-2 mb-3" v-for="recoveryCode in recoveryCodes" :key="'recovery_' + recoveryCode">
									<div class="bg-body p-1 rounded-pill text-center clickable" v-clipboard="JSON.stringify(recoveryCode)" style="padding-top: 7px !important">
										{{ recoveryCode }}
									</div>
								</div>
							</div>

							<div class="w-100 text-center">
								<strong>حتما این اطلاعات را در جای امنی نگه دارید</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<strong class="text-superlight mt-3"> با فعال کردن این ویژگی تمامی دستگاه‌های متصل به این حساب به صورت خودکار خارج می‌شوند. با اولین ورود هر دستگاه، یک تایید جهت ورود از شما درخواست می‌شود. </strong>
		</div>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import Switches from "vue-switches";

export default {
	props: {
		email: {
			default: null,
		},
		phone: {
			default: null,
		},
	},
	created() {
		axios.post("/two-factor-auth/info").then((response) => {
			const data = response.data;
			this.enabled = data.enabled;
			this.isSetuped = data.enabled;
			if (data.enabled) {
				this.select_step = false;
				this.setup_step = false;
			}
			let name = "";
			if (data.type === "app") {
				name = "اپلیکیشن تایید هویت";
			} else if (data.type === "phone") {
				name = "تلفن همراه";
			} else if (data.type === "email") {
				name = "ایمیل";
			}
			this.type = {
				id: data.type,
				label: name,
			};
			this.recoveryCodes = JSON.parse(data.recovery_codes);
		});
	},
	computed: {
		theComponent() {
			if (this.type != null) {
				if (this.type.id == "app") {
					return () => import("../../Settings/TwoFA/GoogleAuth");
				} else if (this.type.id == "email") {
					return () => import("../../Settings/TwoFA/Email");
				} else if (this.type.id == "phone") {
					return () => import("../../Settings/TwoFA/PhoneNumber");
				}
			}
			return null;
		},
		typeText() {
			if (this.type.id === "app") {
				return "اپلیکیشن تایید هویت";
			} else if (this.type.id === "phone") {
				return "تلفن همراه";
			} else if (this.type.id === "email") {
				return "ایمیل";
			}
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
			type: null,

			isSetuped: false,

			select_step: true,
			setup_step: false,

			resetLoading: false,
		};
	},
	methods: {
		action() {
			this.enabled = !this.enabled;
			if (!this.enabled) {
				axios.post("/two-factor-auth/deactive");
				this.cancel();
			}
		},
		downloadCodes() {
			var csvStr = this.recoveryCodes.join(",") + "\n";
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
	},
	mixins: [ModalMixin],
	name: "TwoFAModal",
};
</script>

<style></style>
