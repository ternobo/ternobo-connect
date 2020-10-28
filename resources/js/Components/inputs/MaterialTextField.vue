<template>
<div class="material-textfield">
    <input :type="type" placeholder=" " :class="inputClass" @input="$emit('input',val)" v-model="val" :maxlength="maxlength" class="input" />
    <label v-if="placeholder !== undefined">{{ placeholder }} <span class="text-action" v-if="required">*</span></label>
    <slot></slot>
</div>
</template>

<script>
export default {
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
            val: ''
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
