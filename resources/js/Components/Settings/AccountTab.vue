<template>
	<div>
		<UsernameModal :show.sync="showUsernameModal" @updated="reload" :value="$store.state.user.username"></UsernameModal>
		<!-- <email-modal :show.sync="showEmailModal" @updated="updateEmail" :value="email"></email-modal> -->
		<phone-number-modal :show.sync="showPhoneModal" @updated="updatePhone" :value="phone"></phone-number-modal>
		<PasswordModal :show.sync="showPasswordMdal"></PasswordModal>
		<ChangeLanguageModal :show.sync="showLangModal"></ChangeLanguageModal>
		<DeactiveModal :show.sync="showDeactiveModal"></DeactiveModal>
		<TwoFAModal :status.sync="two_factor_verification" :phone="phone" :email="email" :show.sync="showTwoFAModal"></TwoFAModal>
		<SessionsModal :show.sync="showActiveSessions"></SessionsModal>
		<blocked-pages-modal :show.sync="showBlockedModal"></blocked-pages-modal>
		<h2 class="font-18 font-demibold mb-4">{{ __.get("settings.login-and-security") }}</h2>
		<div class="card mb-2">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">account_circle</i>
						<span>{{ __.get("application.username") }}</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<div class="badge-bg-container clickable" v-clipboard="$APP_URL + '/' + $store.state.user.username">
								<div class="me-2 d-flex align-items-center" style="direction: ltr">
									<i class="material-icons-outlined me-2 text-gray-medium-dark">copy</i>
									<span class="text-grey">
										{{ $root.isDesktop ? `${websiteUrl}/` : "" }} <span class="text-dark">{{ $store.state.user.username }}</span>
									</span>
								</div>
							</div>
						</div>
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showUsernameModal = true">
							<i class="material-icons-outlined">edit</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">perm_phone_msg</i>
						<span>{{ __.get("settings.phone-number") }}</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<span class="badge-bg-container" dir="ltr">{{ phone }}</span>
						</div>
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showPhoneModal = true">
							<i class="material-icons-outlined">edit</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">vpn_key</i>
						<span>{{ __.get("application.password") }}</span>
					</div>
					<div class="d-flex align-items-center">
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showPasswordMdal = true">
							<i class="material-icons-outlined">edit</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">devices</i>
						<span>{{ __.get("settings.active-session") }}</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span class="badge-bg-container" v-if="Boolean(active_sessions)">{{ active_sessions }}</span>
						</div>
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showActiveSessions = true">
							<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">privacy_tip</i>
						<span>{{ __.get("settings.two-step-verification") }}</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span :class="{ 'badge-danger': !two_factor_verification, 'badge-success': two_factor_verification }">{{ two_factor_verification ? __.get("application.active") : __.get("application.inactive") }}</span>
						</div>
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showTwoFAModal = true">
							<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">block</i>
						<span>{{ __.get("settings.blocked-users") }}</span>
					</div>

					<div class="d-flex align-items-center">
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showBlockedModal = true">
							<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
						</button>
					</div>
				</div>
			</div>
		</div>
		<h2 class="font-18 font-demibold my-4 pt-3">{{ __.get("settings.information-security") }}</h2>
		<div class="card">
			<div class="settings-card-body">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">translate</i>
						<span>{{ __.get("settings.website-lang") }}</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<div class="badge-bg-container d-flex justify-content-between w-100" v-if="appDirection == 'rtl'">
								<span class="me-2"> فارسی (Persian) </span>
								<img src="/images/iran-flag.png" style="width: 24px" />
							</div>
							<div class="badge-bg-container d-flex justify-content-between w-100" v-else>
								<span class="me-2">English <span class="text-gray-medium-dark">US</span></span>
								<img src="/emoji/72x72/1f1fa-1f1f8.png" style="width: 24px; height: 24px" />
							</div>
						</div>
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showLangModal = true">
							<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
						</button>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined me-2">cancel</i>
						<span>{{ __.get("settings.deactivate-account") }}</span>
					</div>

					<div class="d-flex align-items-center">
						<button class="ms-4 btn setting-btn btn-subtle btn-icon btn-md" @click="showDeactiveModal = true">
							<i class="material-icons-outlined">{{ appDirection == "rtl" ? "keyboard_arrow_left" : "keyboard_arrow_right" }}</i>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import BlockedPagesModal from "../Modals/Settings/BlockedPagesModal.vue";
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
			showBlockedModal: false,

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

		TwoFAModal: () => import("./TwoFA/TwoFAModal"),

		SessionsModal: () => import("../Modals/Settings/Sessions/SessionsModal"),
		BlockedPagesModal,
	},
};
</script>

<style></style>
