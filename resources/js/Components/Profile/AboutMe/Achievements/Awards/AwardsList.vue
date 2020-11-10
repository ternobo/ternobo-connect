<template>
<div v-if="awards.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
            <div class="d-flex align-items-center">
                <h2 class="font-20">جوایز</h2>
                <div class="mr-2 badge-light">{{ awards.length }}</div>
            </div>
            <i class="material-icons open-achievements" v-if="!edit" :class="{'active': open}">arrow_drop_down</i>
        </div>
        <ul class="awards-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="awards" ref="draggable" tag="ul" v-bind="dragOptions" v-model="awards" class="achievement-list p-0" :disabled="!edit" handle=".hand-hover">
            <AwardItem :detailed="open" :class="{'edit w-100':edit}" @deleted="onDelete(index)" v-model="awards[index]" :edit="edit" v-for="(award, index) in awards" :page="page" :key="'award_' + award.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import AwardItem from "./AwardItem";
import AchievementsMxixin from "../../../../../Mixins/AchievementsMixin";
export default {
    mixins: [AchievementsMxixin],
    methods: {
        onDelete(index) {
            this.awards.splice(index, 1);
        },
        addAward() {
            this.awards.push({
                id: 'award_' + Math.round((new Date()).getTime()),
            });
        },
        getData() {
            return this.awards;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            awards: [],
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
            this.awards = this.value;
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
        AwardItem,
    },
};
</script>
