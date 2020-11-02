<template>
<div class="experience">
    <div class="actions" v-if="edit">
        <i class="material-icons hand-hover">unfold_more</i>
        <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
    </div>
    <div class="detail">
        <div class="d-flex flex-column ml-3">
            <lazy-image src="/images/company-profile.png" class="profile-md mb-2" img-class="profile-md" />
            <button class="btn font-12 follow-btn" @click="showMore = !showMore" v-if="edit">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>
        <div class="mr-3 w-100" v-if="!edit">
            <strong class="text-dark">{{ val.title }}</strong>
            <div class="d-flex aling-items-center">
                <span class="ml-2 text-dark"> {{ val.company }} </span>
                <span class="text-muted"> {{ time_text }} </span>
            </div>
            <p class="job-description my-2" :class="{ open: showMore }">
                {{ val.description }}
            </p>
            <span class="clickable text-action" v-if="val.description.length > 468" @click="showMore = !showMore">مشاهده {{ showMore ? "کمتر" : "بیشتر ..." }}</span>
        </div>
        <div class="row w-100 m-0" v-else>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.company" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="شرکت"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.title" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="سمت"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ شروع <span class="text-action">*</span></strong>
                <DatePicker v-model="val.startDate" :max="{year: year, month: month}"></DatePicker>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ پایان <span class="text-action">*</span></strong>
                <DatePicker v-if="typeof(val.endDate) !== 'boolean' || (val.endDate==false)" v-model="val.endDate" :minYear="val.startDate ? val.startDate.year : 1357" :max="{year: year, month: month}"></DatePicker>
                <input v-else type="text" readonly value="تا کنون" class="form-control bg-white" />
                <Checkbox v-model="val.endDate">
                    همچنان در این سمت فعالیت می‌کنم
                </Checkbox>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <v-select :placeholder="'نوع اشتغال'" class="w-75" dir="rtl" v-model="val.jobType" :options="[
                    { label: 'تمام وقت', code: 'Full-Time' },
                    { label: 'پاره وقت', code: 'Part-Time' },
                    { label: 'کار آموزی', code: 'Internship' },
                    { label: 'فریلنسر', code: 'Freelancer' },
                    { label: 'فصلی', code: 'Seasonal' },
                    { label: 'قراردادی', code: 'Contractual' },
            ]"></v-select>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <MaterialTextField v-model="val.location" class="d-flex align-items-center material--sm" placeholder="محل فعالیت"></MaterialTextField>
            </div>
            <div class="col-md-12 py-4" v-if="showMore">
                <strong>توضیحات</strong>
                <div class="character-counter">
                    <span class="counter tex-dark">{{ leftCharacter }}</span>
                    <div class="progress ml-1 mb-0" style="width: 100px;height: 5px;">
                        <div class="progress-bar" role="progressbar" :style="{ width : progress }" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <textarea-autosize class="form-control" v-model="val.description"></textarea-autosize>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import PersianDate from "persian-date";
import DatePicker from "../../../inputs/DatePicker";
import MaterialTextField from "../../../inputs/MaterialTextField";
import Checkbox from "../../../inputs/Checkbox";

export default {
    created() {
        if (this.value.company) {
            this.val = this.value;
        }
    },
    watch: {
        val: {
            handler(newValue) {
                this.$emit("input", newValue);
                this.progress = (((newValue.description.length / 2500)) * 100) + "%";
                this.leftCharacter = 2500 - newValue.description.length;
            },
            deep: true
        }
    },
    props: {
        value: {
            type: Object,
            default: null
        },
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },

    },
    components: {
        MaterialTextField,
        Checkbox,
        DatePicker
    },
    computed: {
        time_text() {
            let startText = "";
            let endText = "تا کنون";
            if (this.val.startDate) {
                startText = new PersianDate([
                    this.val.startDate.year,
                    this.val.startDate.month.id,
                ]).format("MMMM YYYY");
            }

            if (this.val.endDate) {
                endText = new PersianDate([
                    this.val.endDate.year,
                    this.val.endDate.month.id,
                ]).format("MMMM YYYY");
            }
            return (startText.length > 0 ? startText + " - " : "") + endText;

        },
        now() {
            return new PersianDate(new Date()).toLocale("en").format("L");
        },
        month() {
            return new PersianDate().month();
        },
        year() {
            return new PersianDate().year();
        }
    },
    data() {
        return {
            val: {
                company: "",
                title: "",
                location: "",
                jobType: undefined,
                startDate: null,
                endDate: null,
                description: "",
            },

            showMore: false,
            leftCharacter: 2500,
            progress: 0
        };
    },
};
</script>
