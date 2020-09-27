<template>
<base-layout>
    <div class="content-container-full">
        Here is Content
    </div>
    <sidebar-left class="d-none d-lg-block">
        Here is Sidebar
    </sidebar-left>
</base-layout>
</template>

<script>
import AppLayout from "../Layouts/AppLayout";
export default {
    name: "MyConnectons",
    props: {
        followers_count: {
            type: Number,
            default: undefined,
        },
        following_count: {
            type: Number,
            default: undefined,
        },
        connections_count: {
            type: Number,
            default: undefined,
        },
        connections: {
            type: Object,
            default: undefined,
        },
        page: {
            type: String,
            default: "connections"
        },
        pending_connections: {
            type: Object,
            default: undefined
        }
    },
    layout: AppLayout
}
</script>

<style>

</style>
