<template>
	<div>
		<UsernameModal :show.sync="showUsernameModal" @updated="reload" :value="$page.user.username"></UsernameModal>
		<email-modal :show.sync="showEmailModal" @updated="updateEmail" :value="email"></email-modal>
		<phone-number-modal :show.sync="showPhoneModal" @updated="updatePhone" :value="phone"></phone-number-modal>
		<PasswordModal :show.sync="showPasswordMdal"></PasswordModal>
		<ChangeLanguageModal :show.sync="showLangModal"></ChangeLanguageModal>
		<DeactiveModal :show.sync="showDeactiveModal"></DeactiveModal>
		<TwoFAModal :phone="phone" :email="email" :show.sync="showTwoFAModal"></TwoFAModal>
		<h2 class="font-20 mb-4">ورود و امنیت</h2>
		<div class="card">
			<div class="card-body py-0 px-4">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">account_circle</i>
						<span>نام کاربری</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<section class="slugItem">
								<div class="ml-2 d-flex align-items-center" style="direction: ltr">
									<span class="mr-1">{{ $APP_URL + "/" + $page.user.username }}</span>
								</div>
								<section class="icon">
									<i class="font-18 material-icons-outlined">copy</i>
								</section>
							</section>
						</div>
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showUsernameModal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">perm_phone_msg</i>
						<span>تلفن همراه</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<span class="mr-1">{{ phone }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showPhoneModal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">email</i>
						<span>پست الکترونی</span>
					</div>
					<div class="d-flex align-items-center">
						<div class="content">
							<span class="mr-1">{{ email }}</span>
						</div>
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showEmailModal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">vpn_key</i>
						<span>رمز عبور</span>
					</div>
					<div class="d-flex align-items-center">
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showPasswordMdal = true">edit</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">privacy_tip</i>
						<span>تایید 2 مرحله‌ای</span>
					</div>
					<i class="btn setting-btn material-icons-outlined mr-3" @click="showTwoFAModal = true">keyboard_arrow_left</i>
				</div>
			</div>
		</div>
		<h2 class="font-20 my-4">اطلاعات و دسترسی‌ها</h2>
		<div class="card">
			<div class="card-body py-0 px-4">
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">translate</i>
						<span>زبان نمایش</span>
					</div>

					<div class="d-flex align-items-center">
						<div class="content">
							<div class="d-flex justify-content-between w-100">
								<span class="ml-2"> فارسی (Persian) </span>
								<img src="/img/iranicon.png" style="width: 16px; height: 16px" />
							</div>
						</div>
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showLangModal = true">keyboard_arrow_left</i>
					</div>
				</div>
				<div class="setting-action">
					<div class="name">
						<i class="material-icons-outlined ml-2">cancel</i>
						<span>غیرفعال کردن حساب</span>
					</div>

					<div class="d-flex align-items-center">
						<i class="btn setting-btn material-icons-outlined mr-3" @click="showDeactiveModal = true">keyboard_arrow_left</i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	created() {
		axios.post("/auth/get-info").then((response) => {
			this.phone = response.data.phone;
			this.email = response.data.email;
		});
	},
	methods: {
		reload() {
			Inertia.reload({
				only: ["user"],
			});
		},
		updateEmail(email) {
			this.email = email;
		},
		updatePhone(phone) {
			this.phone = phone;
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
	},
};
</script>

<style>
</style>
