<template>
	<div>
		<UsernameModal :show.sync="showUsernameModal" @updated="reload" :value="$store.state.user.username"></UsernameModal>
		<!-- <email-modal :show.sync="showEmailModal" @updated="updateEmail" :value="email"></email-modal> -->
		<phone-number-modal :show.sync="showPhoneModal" @updated="updatePhone" :value="phone"></phone-number-modal>
		<PasswordModal :show.sync="showPasswordMdal"></PasswordModal>
		<ChangeLanguageModal :show.sync="showLangModal"></ChangeLanguageModal>
		<DeactiveModal :show.sync="showDeactiveModal"></DeactiveModal>
		<TwoFAModal :phone="phone" :email="email" :show.sync="showTwoFAModal"></TwoFAModal>
		<SessionsModal :show.sync="showActiveSessions"></SessionsModal>
		<h2 class="font-18 font-demibold mb-4">ورود و امنیت</h2>
		<div class="card mb-2">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">account_circle</i>
						<span>نام کاربری</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<div class="badge-bg-container clickable" v-clipboard="$APP_URL + '/' + $store.state.user.username">
								<div class="me-2 d-flex align-items-center" style="direction: ltr">
									<span class="text-grey">
										{{ $root.isDesktop ? `${websiteUrl}/` : "" }} <span class="text-dark">{{ $store.state.user.username }}</span>
									</span>
								</div>
							</div>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showUsernameModal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">perm_phone_msg</i>
						<span>تلفن همراه</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<span class="badge-bg-container">{{ phone }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showPhoneModal = true">edit</i>
					</div>
				</div>
				<!-- <div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">email</i>
						<span>پست الکترونیک</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span class="badge-bg-container">{{ Boolean(email) ? email : "ایمیلی ثبت نشده" }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showEmailModal = true">edit</i>
					</div>
				</div> -->
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">vpn_key</i>
						<span>رمز عبور</span>
					</div>
					<div class="d-flex align-items-center">
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showPasswordMdal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">devices</i>
						<span>دستگاه‌های متصل</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span class="badge-bg-container" v-if="Boolean(active_sessions)">{{ active_sessions }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showActiveSessions = true">keyboard_arrow_left</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">privacy_tip</i>
						<span>تایید 2 مرحله‌ای</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span class="font-16 h-auto" style="padding: 12px" :class="{ 'badge-danger': !two_factor_verification, 'badge-success': two_factor_verification }">{{ two_factor_verification ? "فعال" : "غیرفعال" }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showTwoFAModal = true">keyboard_arrow_left</i>
					</div>
				</div>
			</div>
		</div>
		<h2 class="font-18 font-demibold my-4 pt-3">اطلاعات و دسترسی‌ها</h2>
		<div class="card">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">translate</i>
						<span>زبان نمایش</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<div class="badge-bg-container d-flex justify-content-between w-100">
								<span class="me-2"> فارسی (Persian) </span>
								<img src="/images/iran-flag.png" style="width: 24px" />
							</div>
						</div>
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showLangModal = true">keyboard_arrow_left</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">cancel</i>
						<span>غیرفعال کردن حساب</span>
					</div>

					<div class="d-flex align-items-center">
						<i class="btn setting-btn material-icons-outlined ms-3" @click="showDeactiveModal = true">keyboard_arrow_left</i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		axios.post("/settings/get-info").then((response) => {
			this.phone = response.data.phone;
			this.email = response.data.email;
			this.two_factor_verification = response.data.two_factor_verification;
			this.active_sessions = response.data.connected_devices;
		});
	},
	methods: {
		reload() {
			this.$store.dispatch("loadUser");
		},
		updateEmail(email) {
			this.email = email;
		},
		updatePhone(phone) {
			this.phone = phone;
		},
	},
	computed: {
		websiteUrl() {
			return window.location.origin.replace("https://", "").replace("http://", "");
		},
	},
	data() {
		return {
			showUsernameModal: false,
			showPhoneModal: false,
			showEmailModal: false,
			showPasswordMdal: false,
			showLangModal: false,
			showDeactiveModal: false,
			showTwoFAModal: false,

			active_sessions: 0,
			two_factor_verification: false,

			showActiveSessions: false,

			phone: null,
			email: null,
		};
	},
	components: {
		UsernameModal: () => import("../Modals/Settings/UsernameModal"),
		EmailModal: () => import("../Modals/Settings/EmailModal"),
		PasswordModal: () => import("../Modals/Settings/PasswordModal"),
		PhoneNumberModal: () => import("../Modals/Settings/PhoneNumberModal"),

		ChangeLanguageModal: () => import("../Modals/Settings/ChangeLanguageModal"),
		DeactiveModal: () => import("../Modals/Settings/DeactiveModal"),

		TwoFAModal: () => import("../Modals/Settings/TwoFAModal"),

		SessionsModal: () => import("../Modals/Settings/Sessions/SessionsModal"),
	},
};
</script>

<style></style>
