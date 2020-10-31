<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>مهارت‌ها</h5>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit" @click="addSkill">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="skills-list p-0">
            <li v-if="loading">
                <Skeleton :count="4" :heigth="25" />
            </li>
            <Skill @deleted="onDelete(index)" @up="up(index)" @down="down(index)" @input="updateData" :user="page.user" :edit="edit" v-for="(skill, index) in skills" :skill="skill" :key="'skill_' + skill.id" />
        </ul>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import Skill from "./Skill";
export default {
    methods: {
        up(index) {
            // console.log("hh");
            if (index !== 0) {
                let skills = this.skills;
                const temp = skills[index];
                const temp1 = skills[index - 1];

                this.$set(this.skills, (index - 1), temp);
                this.$set(this.skills, index, temp1);
            }

        },

        down(index) {
            if (index !== this.skills.length - 1) {
                this.skills = this.skills.map((element, i) => {
                    // iterate array and change places
                    if (i === index) {
                        return this.skills[index + 1];
                    } else if (i === index + 1) {
                        return this.skills[index];
                    } else {
                        return element;
                    }
                });
            }
        },

        onDelete(index) {
            this.skills.splice(index, 1);
        },
        addSkill() {
            this.skills.push({
                name: '',
                id: 'skill_' + Math.round((new Date()).getTime() / 1000)
            });
        },
        updateData() {
            this.skills = this.getData();
        },
        getData() {
            let data = [];
            this.$children.forEach((item) => {
                data.push(item.skillVal);
            });
            return data;
        },
    },
    data() {
        return {
            loading: false,
            skills: [],
        };
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
    mounted() {
        this.skills = this.page.skills;
    },
    components: {
        Skeleton,
        Skill,
    },
};
</script>
