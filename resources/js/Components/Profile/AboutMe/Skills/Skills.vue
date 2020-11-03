<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-20">مهارت‌ها</h2>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit" @click="addSkill">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="skills-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="skills" ref="draggable" tag="ul" v-bind="dragOptions" v-model="skills" class="skills-list p-0" :disabled="!edit" handle=".hand-hover">
            <Skill @deleted="onDelete(index)" v-model="skills[index]" :user="page.user" :edit="edit" v-for="(skill, index) in skills" :skill="skill" :key="'skill_' + skill.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import Skill from "./Skill";
export default {
    watch: {
        edit(val) {
            if (!val) {
                this.skills.forEach((item, index) => {
                    item.isNew = false;
                    this.$set(this.skills, index, item);
                });
            }
        }
    },
    methods: {
        onDelete(index) {
            this.skills.splice(index, 1);
        },
        addSkill() {
            this.skills.push({
                name: '',
                id: 'skill_' + Math.round((new Date()).getTime() / 1000),
                isNew: true
            });
        },
        getData() {
            let data = [];
            this.$refs.draggable.$children.forEach((item) => {
                data.push(item.skillVal);
            });
            return data;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            list: [],
            skills: [],
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
        page: {
            type: Object,
            default: undefined,
            required: true,
        },
    },
    created() {
        this.skills = this.page.skills;
    },
    components: {
        Skeleton,
        Skill,
    },
};
</script>
