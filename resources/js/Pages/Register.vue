<template>
	<login-layout class="register">
		<laws-modal :show.sync="showlaws"></laws-modal>

		<template #header>
			<dropdown-menu class="me-4 pe-0" :disabled="step > 0" variant="white">
				<template #button="{ active }">
					<i class="material-icons transition" v-if="step < 1" :class="{ 'rotate-180': active }">keyboard_arrow_down</i>
					<span class="d-flex flex-row ms-1" v-if="appDirection == 'ltr'"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /></span>
					<span class="d-flex flex-row ms-1" v-else> <img src="/images/iran-flag.png" width="24" /></span>
				</template>
				<dropdonw-item>
					<language-link lang="en" class="d-flex flex-row"> <img src="/emoji/72x72/1f1fa-1f1f8.png" width="24" /> <span class="ms-3"> English</span> </language-link>
				</dropdonw-item>
				<dropdonw-item>
					<language-link lang="fa" class="d-flex flex-row"> <img src="/images/iran-flag.png" width="24" /> <span class="ms-3"> فارسی</span> </language-link>
				</dropdonw-item>
			</dropdown-menu>
		</template>

		<first-impression :user="user" v-if="step == 0" @next="step = 1" />
		<div class="register-steps" v-else>
			<div class="invite-step" v-if="step == 1">
				<phone-verification @next="next" @verificationToken="setVerificationToken" />
			</div>
			<div class="invite-step" v-else-if="step == 2">
				<password-enter @next="next" :verificationToken="verificationToken" />
			</div>
			<div class="invite-step" v-else-if="step == 3">
				<further-information :verificationToken="verificationToken" @showlaws="showlaws = true" @next="next" />
			</div>
			<div class="invite-step" v-else-if="step == 4">
				<user-profile-picture @next="next" :profile="profile" :loading="loading" />
			</div>
			<div class="invite-step" v-else-if="step == 5">
				<visitor-user-message />
			</div>
		</div>
	</login-layout>
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
import UserProfilePicture from "../Components/Register/UserProfilePicture.vue";
import VisitorUserMessage from "../Components/Register/VisitorUserMessage.vue";
import App from "../Layouts/App.vue";
import LoginLayout from "../Layouts/LoginLayout.vue";
import { serialize } from "../Libs/ObjectToFormdata";

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
		VisitorUserMessage,
		LoginLayout,
		UserProfilePicture,
	},
	layout: App,
	computed: {
		profile() {
			if (this.userinfo.gender == "1") {
				return "/images/woman-profile.png";
			}
			return "/images/man-profile.png";
		},
	},
	methods: {
		next(data) {
			this.userinfo = {
				...this.userinfo,
				...data,
			};
			if (this.step == 4) {
				this.loading = true;
				axios
					.post("/auth/signup", serialize(this.userinfo))
					.then((response) => {
						if (response.data.status) {
							this.goToLastStep();
						}
					})
					.catch((error) => console.log(err))
					.then(() => (this.loading = false));
			} else {
				this.step++;
			}
		},
		setVerificationToken(token) {
			this.verificationToken = token;
		},
		goToLastStep() {
			if (this.visitorRegister) {
				this.step++;
			} else {
				window.location = "/feed";
			}
		},
	},
	mounted() {
		if (this.user == null) {
			this.visitorRegister = !this.hasInvite;
			this.step = 1;
		}
	},
	data() {
		return {
			step: 0,
			loading: false,
			showlaws: false,

			visitorRegister: false,
			verificationToken: null,

			userinfo: {},
		};
	},
	props: ["user", "hasInvite"],
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	max-width: 480px;
}
</style>