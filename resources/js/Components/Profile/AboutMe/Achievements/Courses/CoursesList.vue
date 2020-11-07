<template>
<div v-if="courses.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
            <div class="d-flex align-items-center">
                <h2 class="font-20">دوره‌ها</h2>
                <div class="mr-2 badge-light">{{ courses.length }}</div>
            </div>
            <i class="material-icons open-achievements" :class="{'active': open}">arrow_drop_down</i>
        </div>
        <ul class="courses-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="courses" ref="draggable" tag="ul" v-bind="dragOptions" v-model="courses" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
            <courseItem :detailed="open" :class="{'edit w-100':edit}" @deleted="onDelete(index)" v-model="courses[index]" :edit="edit" v-for="(course, index) in courses" :page="page" :key="'course_' + course.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import CourseItem from "./CourseItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
    mixins: [AchievementsMxixin],
    methods: {
        onDelete(index) {
            this.courses.splice(index, 1);
        },
        addCourse() {
            this.courses.push({
                id: 'course_' + Math.round((new Date()).getTime()),
                name: null,
                code: null,
                skill: null
            });
        },
        getData() {
            return this.courses;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            courses: [],
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

    created() {
        if (this.value != null) {
            this.courses = this.value;
        }
    },
    props: {
        value: {
            default: null,
            required: true
        },
        page: {
            type: Object,
            default: undefined,
            required: true
        },
        edit: {
            type: Boolean,
            default: false,
            required: false,
        },
    },
    components: {
        Skeleton,
        CourseItem,
    },
};
</script>
