<template>
	<div class="phone-number-input">
		<tselect :items="country_codes" @change="phone = countryCode.code" class="mb-4" :class="dropdownClass" valueOption="id" labelOption="country" v-model="countryCode">
			<template v-slot:icon>
				<span class="vertical-middle me-2" v-html="countryIcon"></span>
			</template>
			<template v-slot:itemIcon="{ icon }">
				<span class="vertical-middle me-2" v-html="getCountryIcon(icon)"></span>
			</template>
		</tselect>
		<input dir="ltr" class="form-control" @keyup.enter="$emit('enter')" :readonly="readonly" :class="inputClass" v-model="phone" />
	</div>
</template>

<script>
import CountryCodesFa from "../../Libs/CountryCodes-fa";
import CountryCodesEn from "../../Libs/CountryCodes-en";

import { AsYouType } from "libphonenumber-js";
import parsePhoneNumber from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";
export default {
	props: {
		readonly: {
			type: Boolean,
		},
		value: {
			type: String,
		},
		dropdownClass: {
			type: [String, Array, Object],
			default: "tselect-lg",
		},
		inputClass: {
			type: [String, Array, Object],
			default: "fill-light lg-input",
		},
	},
	data() {
		return {
			phone: "+98",
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
			this.$emit("input", this.phone);
		},
	},
	computed: {
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
	},
};
</script>

<style>
</style>