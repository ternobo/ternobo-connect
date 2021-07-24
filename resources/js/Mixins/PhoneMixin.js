import CountryCodesFa from "../Libs/CountryCodes-fa";
import CountryCodesEn from "../Libs/CountryCodes-en";
const lookup = require("country-code-lookup");
import { AsYouType } from "libphonenumber-js";
import parsePhoneNumber from "libphonenumber-js";
import { v4 as uuidv4 } from "uuid";
export default {
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
        },
    },
    computed: {
        validPhone() {
            return /^(\+)[0-9]{10,}/.test(this.phone);
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

    }
}