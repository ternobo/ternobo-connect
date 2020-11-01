<template>
<div class="d-flex">
    <v-select class="dropdown-list ml-2 w-50" :placeholder="'سال'" dir="rtl" v-model="year" :options="years"></v-select>
    <v-select class="dropdown-list w-50" :placeholder="'ماه'" dir="rtl" v-model="month" :options="monthsList"></v-select>
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
        value: {
            default: null,
        },
        minYear: {
            type: Number,
            default: 1357,
            required: false
        },
        max: {
            type: Object,
            default: () => {
                return {
                    year: null,
                    month: null
                }
            },
            required: false
        },
    },
    computed: {
        years() {
            if (this.max != undefined && this.max.year) {
                return this.yearsFrom(this.minYear, this.max.year);
            }
            return this.yearsFrom(this.minYear);
        },
        monthsList() {
            if (this.year !== null) {
                if (this.max != undefined && this.year == this.max.year && this.max.month) {
                    return this.months(this.max.month);
                }
                return this.months();
            }
            return [];
        }
    },
    watch: {
        year() {
            this.$emit("input", {
                year: this.year,
                month: this.month
            });
        },
        month() {
            this.$emit("input", {
                year: this.year,
                month: this.month
            });
        }
    },
    data() {
        return {
            year: null,
            month: null
        }
    },

}
</script>

<style>

</style>
