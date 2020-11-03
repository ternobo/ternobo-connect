<template>
<div v-if="publishs.length > 0">
    <div class="py-3">
        <div class="d-flex mb-2 align-items-center clickable justify-content-between" @click="showDetailed">
            <div class="d-flex align-items-center">
                <h2 class="font-20">انتشارات</h2>
                <div class="mr-2 badge-light">{{publishs.length }}</div>
            </div>
            <i class="material-icons open-achievements" :class="{'active': open}">arrow_drop_down</i>
        </div>
        <ul class="publishs-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable group="publishs" ref="draggable" tag="ul" v-bind="dragOptions" v-model="publishs" class="publishs-list p-0" :disabled="!edit" handle=".hand-hover">
            <PublishItem @deleted="onDelete(index)" v-model="publishs[index]" :edit="edit" v-for="(publish, index) in publishs" :page="page" :key="'publish_' + publish.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import PublishItem from "./PublishItem";
export default {
    methods: {
        onDelete(index) {
            this.publishs.splice(index, 1);
        },
        addPublish() {
            this.publishs.push({
                id: 'publish_' + Math.round((new Date()).getTime() / 1000),
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
            publishs: [],
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
        PublishItem,
    },
};
</script>
