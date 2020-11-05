<template>
<div v-if="tests.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
            <div class="d-flex align-items-center">
                <h2 class="font-20">آزمون‌ها</h2>
                <div class="mr-2 badge-light">{{tests.length }}</div>
            </div>
            <i class="material-icons open-achievements" :class="{'active': open}">arrow_drop_down</i>
        </div>
        <ul class="tests-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="tests" ref="draggable" tag="ul" v-bind="dragOptions" v-model="tests" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
            <TestItem :detailed="open" :class="{'edit w-100':edit}" @deleted="onDelete(index)" v-model="tests[index]" :edit="edit" v-for="(test, index) in tests" :page="page" :key="'test_' + test.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import TestItem from "./TestItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
    mixins: [AchievementsMxixin],
    methods: {
        onDelete(index) {
            this.tests.splice(index, 1);
        },
        addTest() {
            this.tests.push({
                id: 'test_' + Math.round((new Date()).getTime() / 1000),
            });
        },
        getData() {
            return this.tests;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            tests: [],
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
        TestItem,
    },
};
</script>
