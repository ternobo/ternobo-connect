<template>
<div class="feedback-label" :class="'feedback-color-'+type" v-if="type !== 'voting'">
    <slot></slot>
</div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: "voting"
        },

    },

}
</script>
