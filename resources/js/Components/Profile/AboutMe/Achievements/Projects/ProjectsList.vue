<template>
<div v-if="projects.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-20">پروژه‌ها</h2>
        </div>
        <ul class="projects-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="projects" ref="draggable" tag="ul" v-bind="dragOptions" v-model="projects" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
            <ProjectItem :detailed="open" @deleted="onDelete(index)" v-model="projects[index]" :edit="edit" v-for="(project, index) in projects" :page="page" :key="'project_' + project.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import ProjectItem from "./ProjectItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
    mixins: [AchievementsMxixin],
    methods: {
        onDelete(index) {
            this.projects.splice(index, 1);
        },
        addProject() {
            this.projects.push({
                id: 'project_' + Math.round((new Date()).getTime() / 1000),
            });
        },
        getData() {
            let data = [];
            this.$refs.draggable.$children.forEach((item) => {
                data.push(item.value);
            });
            return data;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            projects: [],
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
        ProjectItem,
    },
};
</script>
