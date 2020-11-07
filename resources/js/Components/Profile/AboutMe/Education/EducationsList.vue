<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-20">تحصیلات</h2>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit" @click="addEducaction">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="educations-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="edupublishs" ref="draggable" tag="ul" v-bind="dragOptions" v-model="educations" class="educations-list p-0" :disabled="!edit" handle=".hand-hover">
            <Education @deleted="onDelete(index)" v-model="educations[index]" :edit="edit" v-for="(educaction, index) in educations" :key="'education_' + educaction.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import Education from "./Education";
export default {
    methods: {
        onDelete(index) {
            this.educations.splice(index, 1);
        },
        addEducaction() {
            this.educations.push({
                id: 'education_' + Math.round((new Date()).getTime()),
            });
        },
        getData() {
            return this.educations;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            educations: [],
        };
    },
    computed: {
        dragOptions() {
            return {
                animation: 200,
                group: "description",
                disabled: false,
                ghostClass: "ghost"
            };
        }
    },
    props: {
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    components: {
        Skeleton,
        Education,
    },
};
</script>
