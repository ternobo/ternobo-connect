<template>
<li :class="{'edit': edit}">
    <a target="_blank" :href="option.starts_with + val" v-if="!edit">
        <i class="material-icons-outlined" :style="{'color': option.color }" v-html="option.icon"></i>
    </a>
    <div class="editItem" v-else>
        <MaterialTextField :notValid='!isValid' placeholder="نام کاربری" class="material--sm w-100" input-class="w-100" v-model="val"></MaterialTextField>
        <div class="d-flex align-items-center mb-3 mb-lg-0 w-100">
            <v-select class="dropdown-list w-100" :placeholder="'انتخاب کنید'" label="name" dir="rtl" v-model="option" :options="options">
                <template v-slot:selected-option="{ icon, color, name }">
                    <i class="material-icons-outlined ml-2" :style="{'color': color }" v-html="icon"></i>
                    <span class="ml-3" style="white-space: nowrap;padding-top: 5px;">
                        {{ name }}
                    </span>
                </template>
                <template v-slot:option="option">
                    <div class="w-100">
                        <i class="material-icons-outlined mr-2 ml-2" :style="{'color': option.color }" v-html="option.icon"></i>
                        <span style="padding-top: 5px" class="ml-3">
                            {{ option.name }}
                        </span>
                    </div>
                </template>
                <template #no-options>موردی یافت نشد</template>
            </v-select>
            <i class="material-icons-outlined text-muted hover-danger pr-2 clickable" @click="doDelete">delete</i>
        </div>
    </div>
</li>
</template>

<script>
export default {
    watch: {
        val() {
            this.value = {
                id: this.social.id,
                "option": this.option,
                "url": this.val
            };
            this.$emit("input", this.value);
        },
        option() {
            this.value = {
                id: this.social.id,
                "option": this.option,
                "url": this.val
            };
            this.$emit("input", this.value);
        }
    },
    computed: {
        isValid() {
            if (this.option != null && this.val != null && this.val.length > 0) {
                return RegExp(this.option.pattern).test(this.val);
            }
            return true;
        },
        websiteUrl() {
            let url = this.val;
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
        },
        validate() {
            if (this.option != null && this.val != null && this.val.length > 0) {
                return RegExp(this.option.pattern).test(this.val);
            }
            return false;
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
