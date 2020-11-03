<template>
<div v-if="awards.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-20">جوایز</h2>
        </div>
        <ul class="awards-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="awards" ref="draggable" tag="ul" v-bind="dragOptions" v-model="awards" class="awards-list p-0" :disabled="!edit" handle=".hand-hover">
            <AwardItem @deleted="onDelete(index)" v-model="awards[index]" :edit="edit" v-for="(award, index) in awards" :page="page" :key="'award_' + award.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import AwardItem from "./AwardItem";
export default {
    methods: {
        onDelete(index) {
            this.awards.splice(index, 1);
        },
        addAward() {
            this.awards.push({
                id: 'award_' + Math.round((new Date()).getTime() / 1000),
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
        AwardItem,
    },
};
</script>
