<template>
<div class="material-textfield">
    <textarea-autosize :minHeight="40" placeholder=" " :class="inputClass" @input="$emit('input',val)" v-model="val" :maxlength="maxlength" class="input"></textarea-autosize>
    <label v-if="placeholder !== undefined">{{ placeholder }}</label>
</div>
</template>

<script>
export default {
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
