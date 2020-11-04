<template>
<div class="material-textfield" :class="{'invalid': invalid}">
    <input :type="type" placeholder=" " :class="inputClass" @blur="check" @input="$emit('input',val)" v-model="val" :maxlength="maxlength" class="input" />
    <label class="d-flex" v-if="placeholder !== undefined">{{ placeholder }} <span class="text-action" v-if="required">*</span></label>
    <slot></slot>
</div>
</template>

<script>
export default {
    methods: {
        check() {
            if ((this.val == null || this.val.length < 1) && this.required) {
                this.invalid = true;
            } else {
                this.invalid = false;
            }
        }
    },
    created() {
        this.val = this.value;
    },
    watch: {
        value() {
            this.val = this.value;
        }
    },
    data() {
        return {
            val: '',
            invalid: false
        }
    },
    props: {
        value: {
            type: String,
            default: "",
            required: false
        },
        required: {
            type: Boolean,
            default: false,
            required: false
        },
        type: {
            type: String,
            default: "text",
            required: false
        },
        maxlength: {
            type: Number,
            default: 15000,
            required: false,
        },
        inputClass: {
            type: String,
            default: "",
            required: false,
        },
        placeholder: {
            type: String,
            default: undefined,
            required: false,
        },
    },
};
</script>
