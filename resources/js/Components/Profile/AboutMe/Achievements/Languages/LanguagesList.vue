<template lang="language">
<div>
    <div class="py-3">
        <div class="d-flex mb-2 aling-items-center justify-content-between">
            <h2 class="font-18">زبان‌ها</h2>
        </div>
        <ul class="languages-list p-0" v-if="loading">
            <li>
                <Skeleton :count="4" :heigth="25" />
            </li>
        </ul>
        <draggable ref="draggable" tag="ul" v-bind="dragOptions" v-model="languages" class="languages-list p-0" :disabled="!edit" handle=".hand-hover">
            <LanguageItem :class="{'w-100':edit}" @deleted="onDelete(index)" v-model="languages[index]" :user="page.user" :edit="edit" v-for="(language, index) in languages" :language="language" :key="'language_' + language.id" />
        </draggable>
    </div>
</div>
</template>

<script>
import {
    Skeleton
} from "vue-loading-skeleton";
import LanguageItem from "./LanguageItem";
export default {
    watch: {},
    methods: {
        onDelete(index) {
            this.languages.splice(index, 1);
        },
        addLanguege() {
            this.languages.push({
                name: '',
                id: 'lang_' + Math.round((new Date()).getTime() / 1000),
                level: null
            });
        },
        getData() {
            let data = [];
            this.$refs.draggable.$children.forEach((item) => {
                data.push(item.languageVal);
            });
            return data;
        },
    },
    data() {
        return {
            drag: false,
            loading: false,
            list: [],
            languages: [],
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
    components: {
        Skeleton,
        LanguageItem,
    },
};
</script>
