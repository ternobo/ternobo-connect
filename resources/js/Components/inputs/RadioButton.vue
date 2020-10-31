<template>
<div class="d-flex align-items-center">
    <div class="radio clickable" @click="val = theValue.value" v-for="theValue in values" :key="'radio_button_uid_' + _uid + '__' + theValue.value">
        <input type="radio" name="radio" class="radio__input" :checked="theValue.value == val" :value="theValue.value" />
        <label class="radio__label">
            {{ theValue.label }}
        </label>
    </div>
</div>
</template>

<script>
export default {
    watch: {
        val() {
            this.$emit("input", this.val);
        }
    },
    created() {
        this.val = this.value;
    },
    data() {
        return {
            id: "",
            val: undefined
        };
    },
    mounted() {
        this.id = this._uid;
    },
    props: {
        value: {
            type: String,
            default: undefined,
            required: false
        },
        values: {
            type: Array,
            default: () => {
                return [];
            },
            required: true,
        },
    },
};
</script>

<style>
</style>
