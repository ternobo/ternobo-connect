<template>
<div class="d-flex">
    <v-select class="datepicker-list ml-2 w-50" v-if="!hideYear" :placeholder="'سال'" dir="rtl" v-model="year" :options="years">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
        <template #no-options>موردی یافت نشد</template>
    </v-select>
    <v-select class="datepicker-list w-50" v-if="!hideMonth" :placeholder="'ماه'" dir="rtl" v-model="month" :options="monthsList">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
        <template #no-options>موردی یافت نشد</template>

    </v-select>
    <v-select class="datepicker-list mr-2 w-50" v-if="showDays" :placeholder="'روز'" dir="rtl" v-model="day" :options="daysList">
        <template #open-indicator="{ attributes }">
            <span v-bind="attributes">
                <i class="material-icons">keyboard_arrow_down</i>
            </span>
        </template>
        <template #no-options>موردی یافت نشد</template>
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
