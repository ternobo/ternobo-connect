<template>
<li class="project-item achievement" :class="{ detailed: detailed }" v-if="val != undefined">
    <div class="mr-3 w-100" v-if="!edit">
        <div class="d-flex justify-content-start" v-if="detailed">
            <div class="title">
                <span><strong>{{ val.name }}</strong></span>
                <span v-if="val.code != null && val.code.length > 0" class="text-muted">{{ val.code }}</span>
            </div>

        </div>
        <div class="achievement-name" v-else>
            <span><strong>{{ val.name }}</strong></span>
        </div>
    </div>
    <div class="editItem" v-else>
        <div class="d-flex flex-column align-items-center ml-3">
            <div class="actions mx-0" v-if="edit">
                <i class="material-icons hand-hover">unfold_more</i>
                <i class="material-icons-outlined hover-danger" @click="$emit('deleted')">delete</i>
            </div>
            <button class="mt-5 btn font-12 ml-1 follow-btn" @click="showMore = !showMore" v-if="edit">
                {{ showMore ? "نمایش کمتر" : "نمایش بیشتر" }}
            </button>
        </div>

        <!--
            Content Edit
        !-->
        <div class="row w-100 m-0">
            <div class="col-md-6 py-4">
                <MaterialTextField v-model="val.name" :required="true" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="نام دوره"></MaterialTextField>
            </div>

            <!--
                More Content
             !-->

            <div class="col-md-6 py-4" v-if="showMore">
                <MaterialTextField v-model="val.code" class="d-flex align-items-center material--sm p-0 col-md-8" placeholder="دوره"></MaterialTextField>
            </div>
            <div class="col-md-6 py-4" v-if="showMore">
                <v-select :placeholder="'مرتبط با'" class="datepicker-list w-75" dir="rtl" v-model="val.skill" label="name" :options="page.skills">
                    <template #open-indicator="{ attributes }">
                        <span v-bind="attributes">
                            <i class="material-icons">keyboard_arrow_down</i>
                        </span>
                    </template>
                </v-select>
            </div>
            <!--
                End More Content
            !-->
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
            },
            deep: true,
        },
    },
    props: {
        page: {
            type: Object,
            default: undefined,
            required: true,
        },
        value: {
            type: Object,
            default: null,
        },
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    components: {
        MaterialTextField,
    },
    data() {
        return {
            val: {
                name: "",
                skill: null,
                code: null,
            },

            showMore: false,
            leftCharacter: 2500,
            progress: 0,
        };
    },
};
</script>
