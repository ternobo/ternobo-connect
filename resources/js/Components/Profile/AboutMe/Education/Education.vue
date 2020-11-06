<template>
<div class="education">
    <div class="actions" v-if="edit">
        <i class="material-icons hand-hover">unfold_more</i>
        <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
    </div>
    <div class="detail">
        <div class="d-flex flex-column ml-3">
            <lazy-image src="/images/school-profile.jpeg" class="profile-md mb-2" img-class="profile-md" />
            <button class="btn font-12 follow-btn" @click="showMore = !showMore" v-if="edit">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>
        <div class="mr-3 w-100" v-if="!edit">
            <strong class="text-dark">{{ val.school }}</strong>
            <div class="d-flex aling-items-center">
                <span class="ml-2 text-dark"> {{ val.degree }} </span>
                <span class="ml-2 text-dark"> {{ val.major }} </span>
            </div>
            <div>
                <span class="text-muted"> {{ time_text }} </span>
            </div>
            <p class="edu-description my-2" v-if="val.description != null && val.description.length > 0" :class="{ open: showMore }">
                {{ val.description }}
            </p>
            <p class="edu-description my-2" v-if="val.activities != null && val.activities.length > 0 && showMore">
                {{ val.activities }}
            </p>
            <span class="clickable text-action" v-if="val.description != null && val.description.length > 468" @click="showMore = !showMore">مشاهده {{ showMore ? "کمتر" : "بیشتر ..." }}</span>
        </div>
        <div class="row w-100 m-0" v-else>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.school" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="محل تحصیل"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.degree" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="مدرک تحصیلی"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.major" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="رشته تحصیلی"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.grade" class="d-flex align-items-center material--sm p-0 col-md-8" input-class="w-100" placeholder="معدل"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ شروع <span class="text-action">*</span></strong>
                <DatePicker :hide-month="true" v-model="val.startDate" :max="{year: year, month: month}"></DatePicker>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ پایان <span class="text-action">*</span></strong>
                <DatePicker :hide-month="true" v-if="typeof(val.endDate) !== 'boolean' || (val.endDate==false)" v-model="val.endDate" :minYear="val.startDate ? val.startDate.year : 1357" :max="{year: year, month: month}"></DatePicker>
                <input v-else type="text" readonly value="تا کنون" class="form-control bg-white" />
                <Checkbox v-model="val.endDate">
                    درحال تحصیل هستم
                </Checkbox>
            </div>
            <div class="col-md-12 py-4" v-if="showMore">
                <strong>انجمن‌ها و فعالیت‌ها</strong>
                <div class="character-counter">
                    <span class="counter tex-dark">{{ leftCharacterActivities }}</span>
                    <div class="progress ml-1 mb-0" style="width: 100px;height: 5px;">
                        <div class="progress-bar" role="progressbar" :style="{ width : progressActivity }" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
                <textarea-autosize class="form-control" v-model="val.activities"></textarea-autosize>
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
        if (this.value.school) {
            this.val = this.value;
        }
    },
    watch: {
        val: {
            handler(newValue) {
                this.$emit("input", newValue);

                if (newValue.description != null) {
                    this.progress = (((newValue.description.length / 2500)) * 100) + "%";
                    this.leftCharacter = 2500 - newValue.description.length;
                }

                if (newValue.activities != null) {
                    this.progressActivity = (((newValue.activities.length / 2500)) * 100) + "%";
                    this.leftCharacterActivities = 2500 - newValue.activities.length;
                }
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
                    this.val.startDate.year
                ]).format("YYYY");
            }

            if (typeof (this.val.endDate) == 'object') {
                endText = new PersianDate([
                    this.val.endDate.year
                ]).format("YYYY");
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
                id: "",
                school: "",
                degree: "",
                major: "",
                grade: undefined,
                startDate: null,
                endDate: null,
                activities: "",
                description: "",
            },

            showMore: false,
            leftCharacter: 2500,
            leftCharacterActivities: 2500,
            progressActivity: 0,
            progress: 0
        };
    },
};
</script>
