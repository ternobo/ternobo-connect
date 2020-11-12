<template>
<li :class="{ 'edit': edit }">
    <a :href="value.option.starts_with + value.url" v-if="!edit">
        <i class="material-icons-outlined ml-1" :style="{'color': value.option.color }" v-html="value.option.icon"></i>
        {{ value.option.name }}
    </a>
    <div class="editItem" v-else>
        <div class="d-flex align-items-center mb-3 mb-lg-0 w-100">
            <v-select class="dropdown-list w-100" :placeholder="'انتخاب کنید'" label="name" dir="rtl" v-model="value.option" :options="options">
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
                <template #no-options>موردی یافت نشد</template>
            </v-select>
            <i class="material-icons-outlined hover-danger pl-2 clickable text-muted" @click="doDelete">delete</i>
        </div>
        <MaterialTextField :notValid='!isValid' :placeholder="placeholder" class="material--sm w-100" input-class="w-100" v-model="value.url"></MaterialTextField>
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
        },
    },
    computed: {
        isValid() {
            if (this.value.option != null) {
                return RegExp(this.value.option.pattern).test(this.value.url);
            }
            return null;
        }
    },
    methods: {
        doDelete() {
            this.$emit("deleted");
        },
        validate() {
            if (this.value.option != null) {
                return RegExp(this.value.option.pattern).test(this.value.url);
            }
        }
    },
    created() {
        if (this.contact != undefined && this.contact != null) {
            this.value = this.contact;
        } else {
            this.value = {
                url: null,
                option: null
            };
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
        contact: {
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
