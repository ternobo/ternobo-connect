<template>
<div class="material-textfield material-textarea">
    <textarea-autosize :minHeight="minHeight" placeholder=" " :class="inputClass" @input="$emit('input',val)" v-model="val" :maxlength="maxlength" class="input"></textarea-autosize>
    <label v-if="placeholder !== undefined">{{ placeholder }}</label>
</div>
</template>

<script>
export default {
    created() {
        this.val = this.value;
    },
    watch: {
        value(newValue) {
            this.val = newValue;
        }
    },
    data() {
        return {
            val: ''
        }
    },
    props: {
        minHeight: {
            type: Number,
            default: 40,
            required: false
        },
        value: {
            default: "15000",
            required: false,
        },
        maxlength: {
            default: "15000",
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

<style>
</style>
