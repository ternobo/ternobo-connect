<template>
<div v-if="inventions.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
            <div class="d-flex align-items-center">
                <h2 class="font-20">اختراعات</h2>
                <div class="mr-2 badge-light">{{inventions.length }}</div>
            </div>
            <i class="material-icons open-achievements" :class="{'active': open}">arrow_drop_down</i>
        </div>
        <ul class="inventions-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="inventions" ref="draggable" tag="ul" v-bind="dragOptions" v-model="inventions" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
            <InventionItem :detailed="open" :class="{'edit w-100':edit}" @deleted="onDelete(index)" v-model="inventions[index]" :edit="edit" v-for="(invention, index) in inventions" :page="page" :key="'invention_' + invention.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import InventionItem from "./InventionItem";

import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
    mixins: [AchievementsMxixin],
    methods: {
        onDelete(index) {
            this.inventions.splice(index, 1);
        },
        addInvention() {
            this.inventions.push({
                id: 'invention_' + Math.round((new Date()).getTime() / 1000),
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
            inventions: [],
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
        InventionItem,
    },
};
</script>
