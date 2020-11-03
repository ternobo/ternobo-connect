<template>
<div class="project">
    <div class="detail">
        <div class="d-flex flex-column align-items-center ml-3">
            <div class="actions" v-if="edit">
                <i class="material-icons hand-hover">unfold_more</i>
                <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
            </div>
            <button class="btn font-12 follow-btn" @click="showMore = !showMore" v-if="edit">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>
        <div class="mr-3 w-100" v-if="!edit">
            <strong class="text-dark">{{ val.name }}</strong>
            <div class="d-flex aling-items-center">
                <span class="text-muted"> {{ time_text }} </span>
            </div>
            <p class="job-description my-2" :class="{ open: showMore }">
                {{ val.description }}
            </p>
            <span class="clickable text-action" v-if="val.description.length > 468" @click="showMore = !showMore">مشاهده {{ showMore ? "کمتر" : "بیشتر ..." }}</span>
        </div>
        <div class="row w-100 m-0" v-else>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="عنوان"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.publisher" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="نام ناشر"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <strong>تاریخ شروع <span class="text-action">*</span></strong>
                <DatePicker v-model="val.date" :max="{year: year, month: month}"></DatePicker>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <MaterialTextField v-model="val.link" class="d-flex align-items-center material--sm" placeholder="لینک ناشر"></MaterialTextField>
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
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

export default {
    created() {
        if (this.value.name) {
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
        page: {
            type: Object,
            default: undefined,
            required: true
        },
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
            if (this.val.startDate) {
                startText = new PersianDate([
                    this.val.startDate.year,
                    this.val.startDate.month.id,
                ]).format("MMMM YYYY");
            }
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
                name: "",
                publisher: undefined,
                date: null,
                link: "",
                description: "",
            },

            showMore: false,
            leftCharacter: 2500,
            progress: 0
        };
    },
};
</script>
