<template>
<div class="ternobo-toast">
    <div class="msg">
        <i class="material-icons-outlined ml-2" :class="iconClass">{{ icon }}</i>
        {{ text }}
    </div>
    <button v-if="showBtn" class="btn btn-toast text-white" :class="buttonClass">{{ btnText }}</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            hide: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.$emit("timeout");
        }, this.timeout);
    },
    props: {
        timeout: {
            type: Number,
            default: 6000
        },
        text: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: "error_outline",
            required: false
        },
        showBtn: {
            type: Boolean,
            default: false,
            required: false
        },
        btnText: {
            type: String,
            default: null,
            required: false
        },
        buttonClass: {
            type: String,
            default: null,
            required: false
        },
        iconClass: {
            type: String,
            default: 'text-warning',
            required: false
        },

    },

}
</script>
