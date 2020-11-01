<template>
<div class="card">
    <div class="py-3 card-body">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h5>تجربیات</h5>
            <button class="btn follow-btn rounded-pill px-3 py-1" v-if="edit" @click="addExperience">
                <i class="material-icons">add</i>
            </button>
        </div>
        <ul class="experiences-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable ref="draggable" tag="ul" v-bind="dragOptions" v-model="experiences" class="experiences-list p-0" :disabled="!edit" handle=".hand-hover">
            <Experience @deleted="onDelete(index)" v-model="experiences[index]" :edit="edit" v-for="(experience, index) in experiences" :key="'experience_' + experience.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import Experience from "./Experience";
export default {
    methods: {
        onDelete(index) {
            this.experiences.splice(index, 1);
        },
        addExperience() {
            this.experiences.push({
                id: 'experience_' + Math.round((new Date()).getTime() / 1000),
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
            experiences: [],
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
        Experience,
    },
};
</script>
