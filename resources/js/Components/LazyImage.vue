<template>
<figure v-lazyload class="image__wrapper">
    <loading-spinner class="image__spinner" />
    <img class="image__item" :data-url="src" :alt="alt">
</figure>
</template>

<script>
export default {
    name: "LazyImage",
    props: {
        src: {
            type: String,
            default: undefined,
            required: true
        },
        alt: {
            type: String,
            default: "Image",
            required: false
        },

    }
}
</script>
