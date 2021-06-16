<template>
	<div class="login-page" :class="{ register: step > 0 }">
		<div class="login-header">
			<laws-modal :show.sync="showlaws"></laws-modal>
			<div class="logo-container">
				<wire-link href="/" class="logodesktop" v-if="$root.isDesktop">
					<img :src="appDirection == 'rtl' ? '/images/farsi-logo.svg' : '/images/logo-en-dark.svg'" class="w-100" />
				</wire-link>
				<wire-link href="/" class="logo-sm" v-if="!$root.isDesktop">
					<img src="/images/logo.svg" class="ms-2" />
				</wire-link>
				<span class="beta-badge">Beta</span>
			</div>
			<div class="login-header-menu">
				<a href="https://trello.com/b/Vku6XmjN/ternobo" target="trello" v-if="step < 1">{{ __.get("application.trello") }}</a>
				<a href="https://discord.gg/unXsnGHsNj" target="discord" v-if="step < 1">{{ __.get("application.discord") }}</a>
				<a href="#" @click="showlaws = !showlaws" v-if="step < 1">{{ __.get("application.comuunity-guidelines") }}</a>
				<dropdown-menu class="me-3 pe-0" :disabled="step > 0" variant="white">
					<template #button="{ active }">
						<i class="material-icons transition" v-if="step < 1" :class="{ 'rotate-180': active }">keyboard_arrow_down</i>
						<span class="d-flex flex-row ms-1" v-if="appDirection == 'ltr'"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /></span>
						<span class="d-flex flex-row ms-1" v-else> <img src="/images/iran-flag.png" width="24" /></span>
					</template>
					<dropdonw-item>
						<a class="d-flex flex-row" href="/set-language?locale=en"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /> <span class="ms-12px"> English</span> </a>
					</dropdonw-item>
					<dropdonw-item>
						<a class="d-flex flex-row" href="/set-language?locale=fa"> <img src="/images/iran-flag.png" width="24" /> <span class="ms-12px"> فارسی</span> </a>
					</dropdonw-item>
				</dropdown-menu>
			</div>
		</div>
		<first-impression :user="user" v-if="step == 0" @next="step = 1" />
		<div class="login-content" v-else>
			<div class="register-steps">
				<div class="invite-step" v-if="step == 1">
					<phone-verification @next="step = 2" />
				</div>
				<div class="invite-step" v-else-if="step == 2">
					<further-information @next="onPersonalSave" />
				</div>
				<div class="invite-step" v-else-if="step == 3">
					<password-enter @next="step = 4" />
				</div>
				<div class="invite-step" v-else-if="step == 4">
					<div class="login-form">
						<div class="login-form w-100">
							<div class="login-card card w-100">
								<div class="card-body">
									<div class="d-flex align-items-center mb-5">
										<label class="font-weight-bold mb-0 font-20 text-dark">{{ __.get("register.profile-image") }}</label>
									</div>
									<div class="d-flex align-content-center justify-content-center">
										<profile-image @updated="updateProfile" ref="profileelem" :canChange="true" :showIcons="false" size="profile-register" class="mb-0 me-32px" :src="profile"></profile-image>
										<button class="btn upload-profile-btn" @click="$refs['profileelem'].openFileSelect()">
											<i class="material-icons-outlined text-dark me-2">cloud_upload</i>
											{{ __.get("application.upload") }}
										</button>
									</div>
									<div class="login-button-container w-100 h-auto">
										<loading-button class="btn btn-primary w-100" @click.native="goFollowings">{{ __.get("application.next") }}</loading-button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import LoginHeader from "../Components/App/LoginHeader.vue";
import DropdonwItem from "../Components/Menues/dropdown/DropdonwItem.vue";
import DropdownMenu from "../Components/Menues/dropdown/DropdownMenu.vue";
import LawsModal from "../Components/Modals/LawsModal.vue";
import OtpInput from "../Components/OtpInput/OtpInput.vue";
import ProfileImage from "../Components/Profile/ProfileImage.vue";
import FirstImpression from "../Components/Register/FirstImpression.vue";
import FurtherInformation from "../Components/Register/FurtherInformation.vue";
import PasswordEnter from "../Components/Register/PasswordEnter.vue";
import PhoneVerification from "../Components/Register/PhoneVerification.vue";
export default {
	components: {
		OtpInput,
		ProfileImage,
		DropdownMenu,
		DropdonwItem,
		LoginHeader,
		FirstImpression,
		PhoneVerification,
		FurtherInformation,
		PasswordEnter,
		LawsModal,
	},
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
		onPersonalSave(gender) {
			this.step = 3;
			if (gender.code == "1") {
				this.profile = "/images/woman-profile.png";
			}
		},
		goFollowings() {
			window.location = "/follow-people";
		},
	},
	data() {
		return {
			step: 0,
			profile: "/images/man-profile.png",
			loading: false,
			showlaws: false,
		};
	},
	props: ["user"],
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	max-width: 480px;
}
</style>