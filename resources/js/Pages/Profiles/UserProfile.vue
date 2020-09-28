<template>
 <h1>user profile</h1>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
export default {
    name: "UserProfile",
    props: {
        User: {
            type: Object,
            default: undefined,
        },
    },
    layout: AppLayout
}
</script>

<style>
</style>
