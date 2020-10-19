<template>
<component :is="component" :post="post"></component>
</template>

<script>
import SimpleEmbed from "../../Components/Embed/SimpleEmbed";
import ArticleEmbed from "../../Components/Embed/ArticleEmbed";

export default {
    created() {
        if (this.post.type === "article") {
            this.component = ArticleEmbed;
        } else if (this.post.type === "post") {
            this.component = SimpleEmbed;
        }

    },
    data() {
        return {
            component: SimpleEmbed
        }
    },
    name: "Widget",
    layout: null,
    props: {
        post: {
            type: Object,
            default: undefined
        },

    },
}
</script>

<style>

</style>
