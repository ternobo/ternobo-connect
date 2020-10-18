<template>
<div class="material-textfield">
    <input type="text" :class="inputClass" @input="$emit('input',value)" v-model="value" :maxlength="maxlength" class="input" />
    <label v-if="placeholder !== undefined">{{ placeholder }}</label>
</div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    },
    props: {
        maxlength: {
            type: Number,
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
