<template>
	<b-modal v-model="showModal" @show="onShow" hide-footer :title="__.get('settings.change-phone-number')" body-class="modal-signup" size="md" :centered="true">
		<div class="d-flex ephone-input-group py-0 justify-content-between align-items-end">
			<div class="d-flex me-4 flex-column">
				<tselect :items="country_codes" @change="phone = countryCode.code" class="mb-3" valueOption="id" labelOption="country" v-model="countryCode">
					<template v-slot:icon>
						<span v-html="countryIcon"></span>
					</template>
					<template v-slot:itemIcon="{ icon }">
						<span class="ms-2" v-html="getCountryIcon(icon)"></span>
					</template>
				</tselect>
				<input type="email" class="form-control mx-0 mt-3 text-input" dir="ltr" :readonly="verification_step" @keypress.enter="sendVcode()" v-model="phone" placeholder="+989123456789" />
			</div>
			<LoadingButton class="btn signup-save-btn btn-primary" :disabled="verification_step || phone.length < 1 || notChanged" :loading="loading && !verification_step" @click.native="sendVcode()">ثبت</LoadingButton>
		</div>
		<transition name="slide">
			<div v-if="verification_step" class="text">
				<label class="me-1 mt-2 text-left clickable" @click="verification_step = false">{{ __.get("") }}</label>

				<div class="input-group d-flex align-items-center flex-column justify-content-center mt-4">
					<label class="w-100" v-html="__.get('register.enter-verification-code')"></label>
					<div class="d-flex align-items-center">
						<otp-input input-class="w-100" class="text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
						<i class="material-icons-outlined" :class="{ 'text-danger': invalidCode }">verified_user</i>
					</div>
				</div>
				<div class="d-flex justify-content-end">
					<LoadingButton :loading="loading" class="btn btn-primary mx-3 mt-4" @click.native="verifyCode">{{ __.get("application.confirm") }}</LoadingButton>
				</div>
			</div>
		</transition>
	</b-modal>
</template>

<script>
import ModalMixin from "../../../Mixins/Modal";
import LoadingButton from "../../buttons/LoadingButton.vue";
import LoadingSpinner from "../../LoadingSpinner.vue";
import OtpInput from "../../OtpInput/OtpInput.vue";
import CountryCodesFa from "../../../Libs/CountryCodes-fa";
import CountryCodesEn from "../../../Libs/CountryCodes-en";
import { AsYouType } from "libphonenumber-js";
import parsePhoneNumber from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";
export default {
	methods: {
		getCountryIcon(icon) {
			if (icon != null) {
				return twemoji.parse(icon);
			}
			return twemoji.parse("🇦🇳");
		},
		getFlagEmoji(countryCode) {
			if (countryCode == null) {
				return "🇦🇳";
			}
			const codePoints = countryCode
				.toUpperCase()
				.split("")
				.map((char) => 127397 + char.charCodeAt());
			return String.fromCodePoint(...codePoints);
		},

		sendVcode() {
			this.loading = true;
			var data = new FormData();
			data.append("phone", this.phone);

			var config = {
				method: "post",
				url: "/settings/verification",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.verification_step = true;
					} else {
						const errors = response.data.errors;
						this.handleError(errors);
					}
					this.loading = false;
				})
				.catch((error) => {
					this.loading = false;
				});
		},
		verifyCode() {
			this.nextLoading = true;
			var data = new FormData();
			data.append("code", this.code);

			var config = {
				method: "post",
				url: "/settings/verify-phone",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.$emit("update:show", false);
						this.$emit("updated", this.phone);
						this.invalidCode = false;
						this.verification_step = false;
					} else {
						this.invalidCode = true;
					}
					this.nextLoading = false;
				})
				.catch((error) => {
					this.nextLoading = false;
				})
				.then(() => (this.completedCode = true));
		},
		onShow() {
			if (this.value != null) {
				this.phone = this.value;
			}
		},
	},
	props: {
		value: {
			default: null,
		},
	},
	watch: {
		phone() {
			if (this.phone.startsWith("00")) {
				this.phone = this.phone.replace("00", "+");
				return;
			}
			let countryCode = parsePhoneNumber(new AsYouType().input(this.phone))?.countryCallingCode;
			if (countryCode) {
				this.countryCode = this.country_codes.filter((item) => item.code == `+${countryCode}`)[0];
			}
		},
	},
	computed: {
		notChanged() {
			return this.phone == this.value;
		},

		countriesObject() {
			let countriesObject = CountryCodesFa;
			if (window.lang == "en") {
				countriesObject = CountryCodesEn;
			}
			return countriesObject;
		},
		country_codes() {
			let list = [];

			for (const item of this.countriesObject) {
				list.push({
					id: uuidv4(),
					country: item.country,
					code: item.code,
					icon: item.icon,
				});
			}

			return list;
		},
		countryIcon() {
			return twemoji.parse(this.countryCode.icon);
		},
	},
	data() {
		return {
			loading: false,
			code: null,
			verification_step: false,
			phone: "",
			nextLoading: false,

			invalidCode: false,
			completedCode: false,

			countryCode: {
				country: "Iran (+98)",
				code: "+98",
				icon: "🇮🇷",
			},
		};
	},
	components: {
		LoadingButton,
		LoadingSpinner,
		OtpInput,
	},
	mixins: [ModalMixin],
	name: "PhoneNumberModal",
};
</script>

<style></style>
