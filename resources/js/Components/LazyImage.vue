<template>
<figure v-lazyload class="image__wrapper">
    <loading-spinner class="image__spinner" />
    <i class="material-icons error_icon">error_outline</i>
    <img class="image__item" ref="imageItem" :style="imgStyle" :class="imgClass" :data-url="src" :alt="alt">
</figure>
</template>

<script>
export default {
    watch: {
        src(val) {
            this.$el.classList.remove("loaded");
            this.$refs.imageItem.src = val;
        }
    },
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
        imgClass: {
            type: String,
            required: false
        },
        imgStyle: {
            type: String,
            required: false
        }

    }
}
</script>
