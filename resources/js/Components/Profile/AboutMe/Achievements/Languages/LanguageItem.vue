<template>
<li v-if="language != undefined">
    <div class="language-name" v-if="!edit">
        {{ languageVal.name }}
    </div>
    <div class="editItem" v-else>
        <div class="actions" v-if="edit">
            <i class="material-icons hand-hover">unfold_more</i>
            <i class="material-icons-outlined hover-danger clickable" @click="doDelete">delete</i>
        </div>
        <MaterialTextField v-model="languageVal.name" class="material--sm w-100" input-class="w-100 py-1"></MaterialTextField>
        <v-select class="dropdown-list w-50" :placeholder="'تسلط'" dir="rtl" v-model="language.level" :options="[
            {
                label: 'مبتدی',
                level: 1
            },
            {
                label: 'متوسط',
                level: 2
            },
            {
                label: 'حرفه‌ای',
                level: 3
            },
            {
                label: 'زبان مادری',
                level: 4
            },
        ]"></v-select>
    </div>
</li>
</template>

<script>
import RadioButton from "../../../../inputs/RadioButton";
export default {
    components: {
        RadioButton
    },
    watch: {
        languageVal() {
            this.$emit("input", this.languageVal);
        },
    },
    methods: {
        doDelete() {
            this.$emit("deleted");
        }
    },
    created() {
        if (this.language != undefined && this.language != null) {
            this.languageVal = this.language;
        }
    },
    data() {
        return {
            languageVal: null
        }
    },
    props: {
        user: {
            type: Object,
            default: undefined,
            required: true
        },
        language: {
            type: Object,
            default: undefined,
        },
        edit: {
            type: Boolean,
            default: false,
        },

    },

}
</script>
