<template>
<li>
    <a :href="option.starts_with + val" v-if="!edit">
        <i class="material-icons-outlined" :style="{'color': option.color }" v-html="option.icon"></i>
    </a>
    <div class="editItem" v-else>
        <MaterialTextField :placeholder="placeholder" class="material--sm w-100" input-class="w-100" v-model="val"></MaterialTextField>
        <div class="d-flex align-items-center pl-2 mb-3 mb-lg-0 w-100">
            <i class="material-icons-outlined hover-danger pl-2 clickable" @click="doDelete">delete</i>
            <v-select class="dropdown-list w-100" :placeholder="'انتخاب کنید'" label="name" dir="rtl" v-model="option" :options="options">
                <template v-slot:selected-option="{ icon, color, name }">
                    <i class="material-icons-outlined ml-1" :style="{'color': color }" v-html="icon"></i>
                    <span class="ml-3" style="white-space: nowrap">
                        {{ name }}
                    </span>
                </template>
                <template v-slot:option="option">
                    <div class="w-100">
                        <i class="material-icons-outlined ml-1" :style="{'color': option.color }" v-html="option.icon"></i>
                        <span class="ml-3">
                            {{ option.name }}
                        </span>
                    </div>
                </template>
            </v-select>
        </div>
    </div>
</li>
</template>

<script>
export default {
    watch: {
        val() {
            this.$emit("input", {
                "option": this.option,
                "url": this.val
            });

        },
        option() {
            this.value = {
                "option": this.option,
                "url": this.val
            };
            this.$emit("input", this.value);
        }
    },
    computed: {
        websiteUrl() {
            let url = this.value.url;
            if (url.startsWith("http://") || url.startsWith("https://")) {
                return url;
            } else {
                return "http://" + url;
            }
        },
    },
    methods: {
        doDelete() {
            this.$emit("deleted");
        }
    },
    created() {
        if (this.social != undefined && this.social != null) {
            this.val = this.social.url;
            this.option = this.social.option;
        }
    },
    data() {
        return {
            value: {},
            val: null,
            option: null,
            availableOptions: []
        }
    },
    props: {
        options: {
            type: Array,
            default: () => {
                return []
            },
            required: true
        },
        placeholder: {
            type: String,
            default: undefined,
        },
        social: {
            type: Object,
            default: null,
        },
        edit: {
            type: Boolean,
            default: false,
        },

    },

}
</script>

<style>

</style>
