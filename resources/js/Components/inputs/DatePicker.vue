<template>
<div class="d-flex">
    <v-select class="dropdown-list ml-2 w-50" v-if="!hideYear" :placeholder="'سال'" dir="rtl" v-model="year" :options="years">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
    </v-select>
    <v-select class="dropdown-list w-50" v-if="!hideMonth" :placeholder="'ماه'" dir="rtl" v-model="month" :options="monthsList">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
    </v-select>
    <v-select class="dropdown-list mr-2 w-50" v-if="showDays" :placeholder="'روز'" dir="rtl" v-model="day" :options="daysList">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
    </v-select>
</div>
</template>

<script>
export default {
    created() {
        if (this.value !== null) {
            this.year = this.value.year;
            this.month = this.value.month;
        }
    },
    props: {
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
        },
        years() {
            if (this.max != undefined && this.max.year) {
                return this.yearsFrom(this.minYear, this.max.year);
            }
            return this.yearsFrom(this.minYear);
        },
        monthsList() {
            if (this.year !== null) {
                if (
                    this.max != undefined &&
                    this.year == this.max.year &&
                    this.max.month
                ) {
                    return this.months(this.max.month);
                }
                return this.months();
            }
            return [];
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
