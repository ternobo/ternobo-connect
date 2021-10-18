<template>
	<div class="login-form">
		<div class="login-form w-100">
			<div class="login-card card w-100">
				<div class="card-body">
					<div class="d-flex align-items-center mb-7">
						<i class="material-icons-outlined clickable me-3 text-grey" :class="{ 'rotate-180': appDirection == 'rtl' }" v-if="verification_step" @click="verification_step = false">arrow_back</i>
						<label class="font-weight-bold mb-0 font-20 text-dark">{{ title }}</label>
					</div>
					<div>
						<tselect :items="country_codes" @change="phone = countryCode.code" class="mb-4 tselect-lg" valueOption="id" labelOption="country" v-model="countryCode">
							<template v-slot:icon>
								<span class="vertical-middle me-2" v-html="countryIcon"></span>
							</template>
							<template v-slot:itemIcon="{ icon }">
								<span class="vertical-middle me-2" v-html="getCountryIcon(icon)"></span>
							</template>
						</tselect>
						<input dir="ltr" class="form-control fill-light lg-input" :readonly="verification_step" v-model="phone" />
					</div>
					<div class="d-flex flex-column align-items-center mt-4" v-if="verification_step">
						<div class="d-flex align-items-center">
							<otp-input input-class="w-100" class="mx-1 text-center" @completed="verifyCode" v-model="code" :numInputs="6" />
						</div>
						<div class="mt-7" style="width: 160px">
							<span
								class="clickable d-flex justify-content-between align-items-center font-14"
								:class="{
									'disabled text-muted': countdown > 0,
									'text-action': !(countdown > 0),
								}"
								@click="sendVcode"
							>
								<span>{{ __.get("settings.resend") }}</span> <span class="text-dark">{{ countdown > 0 ? "00:" + countdown : "" }}</span>
							</span>
						</div>
					</div>
					<div class="login-button-container w-100 h-auto">
						<loading-button :loading="loading" class="btn btn-lg btn-primary w-100" @click.native="next">{{ __.get("application.next") }}</loading-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CountDownMixin from "../../Mixins/CountDownMixin";
import OtpInput from "../OtpInput/OtpInput.vue";
import CountryCodesFa from "../../Libs/CountryCodes-fa";
import CountryCodesEn from "../../Libs/CountryCodes-en";
const lookup = require("country-code-lookup");
import { AsYouType } from "libphonenumber-js";
import parsePhoneNumber from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";
export default {
	components: { OtpInput },
	mixins: [CountDownMixin],
	data() {
		return {
			phone: "+98",
			loading: false,
			verification_step: false,
			phone_step: true,
			code: "",
			countryCode: {
				country: "Iran (+98)",
				code: "+98",
				icon: "🇮🇷",
			},
		};
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
		title() {
			if (this.verification_step) {
				return __.get("register.verification");
			}
			return __.get("validation.attributes.phone_number");
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
	methods: {
		next() {
			if (this.verification_step) {
				return this.verifyCode();
			}
			return this.sendVcode();
		},
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
			this.countdown = 30;
			this.countDownTimer();
			var data = new FormData();
			data.append("phone", this.phone);

			var config = {
				method: "post",
				url: "/auth/verification",
				data: data,
			};

			axios(config)
				.then((response) => {
					if (response.data.result) {
						this.phone_step = false;
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
						this.$emit("next");
					} else {
						this.toast(__.get("messages.invalid-code"), "error", "text-danger");
					}
					this.loading = false;
				})
				.catch((error) => {
					console.log(error);
					this.loading = false;
				})
				.then(() => {
					this.loading = false;
				});
		},
	},
};
</script>

<style lang="scss" scoped>
.login-form {
	width: 100%;
	max-width: 480px;
}
</style>