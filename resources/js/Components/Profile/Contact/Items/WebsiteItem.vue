<template>
<li>
    <a class="d-flex flex-column text-left font-14" :href="websiteUrl" v-if="!edit">
        <span>{{ value.url.replace("https://","").replace("http://","") }}</span>
        <strong class="text-muted">{{ value.option.name }}</strong>
    </a>
    <div class="editItem" v-else>
        <MaterialTextField :placeholder="placeholder" class="material--sm w-100" input-class="w-100" v-model="val"></MaterialTextField>
        <div class="d-flex align-items-center mb-3 mb-lg-0 w-100">
            <v-select class="dropdown-list w-100" :placeholder="'انتخاب کنید'" label="name" dir="rtl" v-model="option" :options="options">
                <template #open-indicator="{ attributes }">
                    <span v-bind="attributes">
                        <i class="material-icons">keyboard_arrow_down</i>
                    </span>
                </template>
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
            <i class="material-icons-outlined text-muted hover-danger pl-2 clickable" @click="doDelete">delete</i>
        </div>
    </div>
</li>
</template>

<script>
export default {
    watch: {
        val() {
            this.value = {
                "option": this.option,
                "url": this.val
            };
            this.$emit("input", this.value);

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
        if (this.website != undefined && this.website != null) {
            this.val = this.website.url;
            this.option = this.website.option;
        }
        this.value = {
            "option": this.option,
            "url": this.val
        };

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
        website: {
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

<style>

</style>
