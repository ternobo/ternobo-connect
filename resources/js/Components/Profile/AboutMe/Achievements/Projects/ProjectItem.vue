<template>
<li class="project-item achievement" :class="{ 'detailed': detailed }" v-if="val != undefined">
    <div class="mr-3 w-100" v-if="!edit">
        <div class="d-flex justify-content-start" v-if="detailed">
            <div class="title">
                <a :href="val.link" v-if="val.link != null && val.link.length > 0"><strong>{{ val.name }}</strong></a>
                <span v-else><strong>{{ val.name }}</strong></span>
                <span class="font-12 text-muted">{{ time_text }}</span>
            </div>
            <p class="bg-body py-2 px-3" v-if="val.description != null && val.description.length > 0">
                {{ val.description }}
            </p>
        </div>
        <div class="achievement-name" v-else>
            <a :href="val.link" v-if="val.link != null && val.link.length > 0"><strong>{{ val.name }}</strong></a>
            <span v-else><strong>{{ val.name }}</strong></span>
        </div>
    </div>
    <div class="editItem" v-else>
        <div class="d-flex flex-column align-items-center ml-3" v-if="edit">
            <div class="actions">
                <i class="material-icons hand-hover">unfold_more</i>
                <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
            </div>
            <button class="mt-3 btn font-12 follow-btn" @click="showMore = !showMore">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>

        <!--
            Content Edit
        !-->
        <div class="row">
            <div class="col-md-12 py-4">
                <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="نام پروژه"></MaterialTextField>
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
                    همچنان در حال کار بر روی این پروژه هستم
                </Checkbox>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <v-select :placeholder="'مرتبط با'" class="w-75" dir="rtl" v-model="val.skills" label="name" :options="page.skills"></v-select>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <MaterialTextField v-model="val.link" class="d-flex align-items-center material--sm" placeholder="لینک پروژه"></MaterialTextField>
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
        <!--
            Content Edit End
        !-->
    </div>
</li>
</template>

<script>
import PersianDate from "persian-date";
import DatePicker from "../../../../inputs/DatePicker";
import MaterialTextField from "../../../../inputs/MaterialTextField";
import Checkbox from "../../../../inputs/Checkbox";

import AchievementsItem from "../../../../../Mixins/AchievementsItem";
export default {
    mixins: [AchievementsItem],
    created() {
        if (this.value.name) {
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
            let endText = "تا کنون";
            if (typeof (this.val.startDate) == 'object') {
                startText = new PersianDate([
                    this.val.startDate.year,
                    this.val.startDate.month.id,
                ]).format("MMMM YYYY");
            }

            if (typeof (this.val.endDate) == 'object') {
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
                name: "",
                skill: undefined,
                startDate: null,
                endDate: null,
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
