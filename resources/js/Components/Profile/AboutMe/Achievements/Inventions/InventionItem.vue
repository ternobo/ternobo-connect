<template>
<li class="project-item achievement" :class="{ 'detailed': detailed }" v-if="val != undefined">
    <div class="mr-3 w-100" v-if="!edit">
        <div class="d-flex justify-content-start" v-if="detailed">
            <div class="title">
                <a :href="val.link" v-if="val.link != null && val.link.length > 0"><strong>{{ val.name }}</strong></a>
                <span v-else><strong>{{ val.name }}</strong></span>
                <span class="font-12 text-muted">{{ time_text }}</span>
                <span class="font-12 text-muted">{{ val.organization }} | {{ val.registerCode }}</span>
                <span class="font-12 text-muted">{{ val.organization }} | {{ val.status.label }}</span>

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
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0" placeholder="نام اختراع"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.organization" :required="true" class="d-flex align-items-center material--sm p-0" placeholder="اداره ثبت اختراع"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.registerCode" :required="true" class="d-flex align-items-center material--sm p-0" placeholder="شماره ثبت"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.link" class="d-flex align-items-center material--sm p-0" placeholder="لینک ثبت اختراع"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4">
                <v-select :searchable="false" :placeholder="'وضعیت'" class="dropdown-list w-75" dir="rtl" v-model="val.status" :options="[
                    {
                        label: 'حق ثبت اختراع صادر شده',
                        id: 1
                    },
                    {
                        label: 'حق ثبت اختراع درحال ثبت شدن است',
                        id: 2
                    }
                ]">
                    <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </span>
                    </template>
                </v-select>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <strong>تاریخ صدور ثبت اختراع</strong>
                <DatePicker :showDays="true" v-model="val.date" :max="{year: year, month: month}"></DatePicker>
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
            let dateText = "";
            if (typeof (this.val.date) == 'object') {
                dateText = new PersianDate([
                    this.val.date.year,
                    this.val.date.month.id,
                    this.val.date.day,
                ]).format("d MMMM YYYY");
            }
            return dateText;
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
                organization: null,
                registerCode: null,
                link: null,
                status: null,
                date: null,
                description: "",
            },

            showMore: false,
            leftCharacter: 2500,
            progress: 0
        };
    },
};
</script>
