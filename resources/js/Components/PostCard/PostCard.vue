<template>
<component :post="post" v-bind:is="componentType"></component>
</template>

<script>
import SimplePost from "./SimplePost";
import ArticleCard from "./ArticleCard";
export default {
    created() {
        if (this.post.type === "article") {
            this.componentType = require("./ArticleCard").default;
        } else if (this.post.type === "share") {
            this.componentType = require("./ResharedPost").default;
        }
    },
    data() {
        return {
            componentType: require("./SimplePost").default
        }
    },
    name: "PostCard",
    props: {
        post: {
            type: Object,
            default: undefined,
            required: true,
        }
    }
};
</script>

<style>
</style>
