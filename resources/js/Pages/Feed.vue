<template>

</template>

<script>
import AppLayout from "../Layouts/AppLayout";

export default {
    name: "Feed",
    props: {
        posts: {
            type: Object,
            default: undefined
        },
    },
    layout: AppLayout
};
</script>

<style>
</style>
