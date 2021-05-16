<template>
	<div class="date-picker-container">
		<tselect dir="rtl" :disabled="disabled" v-if="!hideMonth" valueOption="label" labelOption="label" v-model="month" :items="monthsList">ماه</tselect>
		<tselect dir="rtl" :disabled="disabled" v-if="!hideYear" v-model="year" :items="years">سال</tselect>
		<tselect dir="rtl" v-if="showDays" valueOption="label" labelOption="label" v-model="day" :items="daysList" no-item="ماه انتخاب نشده"> روز </tselect>
	</div>
</template>

<script>
export default {
	created() {
		if (this.value !== null) {
			this.year = this.value.year;
			this.month = this.value.month;
			this.day = this.value.day;
		}
	},
	props: {
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
			default: 1357,
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
	watch: {
		year() {
			this.$emit("input", {
				year: this.year,
				month: this.month,
			});
		},
		month() {
			this.$emit("input", {
				year: this.year,
				month: this.month,
			});
		},
		day() {
			this.$emit("input", {
				year: this.year,
				month: this.month,
				day: this.day,
			});
		},
	},
	data() {
		return {
			year: null,
			month: null,
			day: null,
		};
	},
};
</script>

<style>
</style>
