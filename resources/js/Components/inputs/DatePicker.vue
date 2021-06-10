<template>
	<div class="date-picker-container">
		<tselect :dir="appDirection" :disabled="disabled" v-if="!hideMonth" valueOption="label" labelOption="label" v-model="month" :items="monthsList">ماه</tselect>
		<tselect :dir="appDirection" :disabled="disabled" v-if="!hideYear" v-model="year" :noItem="noYearPlaceholder" :items="years">سال</tselect>
		<tselect :dir="appDirection" v-if="showDays" valueOption="label" labelOption="label" v-model="day" :items="daysList" no-item="ماه انتخاب نشده"> روز </tselect>
	</div>
</template>

<script>
import jalaali from "jalaali-js";
export default {
	created() {
		if (this.value !== null) {
			let date = this.getDateObject(this.value);
			this.year = date.year;
			this.month = date.month;
			// this.day = date.day;
		}
	},
	props: {
		noYearPlaceholder: {
			type: String,
			default: "موردی یافت نشد",
			require: false,
		},
		disabled: {
			type: Boolean,
			default: false,
			required: false,
		},
		showDays: {
			type: Boolean,
			default: false,
			required: false,
		},
		hideMonth: {
			type: Boolean,
			default: false,
			required: false,
		},
		hideYear: {
			type: Boolean,
			default: false,
			required: false,
		},
		value: {
			default: null,
		},
		minYear: {
			type: Number,
			default: window.lang == "fa" ? 1357 : 1980,
			required: false,
		},

		max: {
			type: Object,
			default: () => {
				return {
					year: null,
					month: null,
				};
			},
			required: false,
		},
	},
	computed: {
		daysList() {
			if (this.month !== null) {
				let days = [];
				if (this.month.id <= 6) {
					let day = 1;
					while (day <= 31) {
						days.push(day);
						day++;
					}
				} else {
					let day = 1;
					while (day <= 30) {
						days.push(day);
						day++;
					}
				}
				return days;
			}
			return [];
		},
		years() {
			if (this.max != undefined && this.max.year) {
				return this.yearsFrom(this.minYear, this.max.year);
			}
			return this.yearsFrom(this.minYear);
		},
		monthsList() {
			return this.months();
		},
	},
	methods: {
		updateDate() {
			if (Boolean(this.year) && Boolean(this.month)) {
				let zeroOne = "01";
				if (lang == "fa") {
					let value = jalaali.toGregorian(this.year, this.month.id, this.day ? this.day : 1);
					console.log(value);
					this.$emit("input", `${value.gy}/${value.gm}/${this.day ? value.gd : zeroOne}`);
				} else {
					console.log(`${this.year}/${this.month.id}/${this.day ? this.day : zeroOne}`);
					this.$emit("input", `${this.year}/${this.month.id}/${this.day ? this.day : zeroOne}`);
				}
			}
		},
	},
	watch: {
		year() {
			this.updateDate();
		},
		month() {
			this.updateDate();
		},
		day() {
			this.updateDate();
		},
	},
	data() {
		return {
			year: null,
			month: null,
			day: "01",
		};
	},
};
</script>

<style>
</style>
